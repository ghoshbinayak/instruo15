from django.shortcuts import render
from events.forms import EventPostForm
import uuid
import os
import json
from django.utils import timezone
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils.encoding import smart_str, smart_unicode
from django.conf import settings
from accounts.models import Organiser, Participant
from events.models import event, category
from events.models import event_list


@login_required
@user_passes_test(lambda u: u.is_organiser)
def new(request):
    # Handle image uploads for the post.
    if request.is_ajax():
        json_response = "{"
        for uploaded_file in request.FILES.getlist('photo'):
            # create folder with story id
            if not os.path.exists(settings.MEDIA_ROOT + "/" + request.POST.get('event_id')):
                os.makedirs(settings.MEDIA_ROOT + "/" + request.POST['event_id'])

            if os.path.exists(settings.MEDIA_ROOT + request.POST['event_id'] + '/' + uploaded_file.name):
                e.name = '1' + uploaded_file.name

            with open(settings.MEDIA_ROOT + "/" + request.POST['event_id'] + '/' + uploaded_file.name, 'w') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
            json_response = json_response + "\"" + \
                uploaded_file.name + "\": \"" + "media/" + request.POST['event_id'] + \
                "/" + uploaded_file.name + "\","
        json_response = json_response[:-1] + "}"
        return HttpResponse(json_response, content_type="application/json")

    # Handle the draft saves.

    # Handle the final save.
    if request.method == 'POST':
        form = EventPostForm(request.POST)
        event_id = request.POST['event_id']
        if form.is_valid():
            form.clean()
            title = form.cleaned_data['title']
            description = form.cleaned_data['description']
            time = form.cleaned_data['time']
            prize = form.cleaned_data['prize']
            short_description = form.cleaned_data['short_description']
            coordinator1 = Organiser.objects.get(email=request.user.email)
            coordinator2 = Organiser.objects.get(
                email=form.cleaned_data['second_coordinator'])
            cat = form.cleaned_data['category']
            cat = category.objects.get(name=cat)
            new_event = event(
                uuid=event_id,
                f_uuid=event_id,
                title=title,
                description=description,
                short_description= short_description,
                prize = prize,
                coordinator1=coordinator1,
                coordinator2=coordinator2,
                time=time,
                timestamp=timezone.now(),
            )
            volunteer1 = form.cleaned_data.get('volunteer1', None)
            volunteer2 = form.cleaned_data.get('volunteer2', None)
            location = form.cleaned_data.get('location', None)
            cover_image_link = form.cleaned_data.get('cover_image_link', None)
            if volunteer1:
                volunteer1 = Organiser.objects.get(email=volunteer1)
                new_event.volunteer1 = volunteer1
            if volunteer2:
                volunteer2 = Organiser.objects.get(email=volunteer2)
                new_event.volunteer2 = volunteer2
            if location:
                new_event.location = location
            if cover_image_link:
                new_event.cover_image_link = cover_image_link
            new_event.save()
            entry = event_list(f_uuid=event_id,
                               c_uuid=new_event,
                               l_uuid=new_event,
                               category=cat,
                               )
            entry.save()
            return render(request, 'events/index.html',
                          {'events': [new_event]})
        else:
            return render(request,
                          'events/editor.html',
                          {'post': 'some thing went wrong',
                           'action': 'new',
                           'form': form, 'id': event_id})
    event_id = uuid.uuid4().get_hex()
    form = EventPostForm()
    return render(request,
                  'events/editor.html',
                  {'action': 'new',
                   'form': form, 'id': event_id})


@login_required
@user_passes_test(lambda u: u.is_organiser)
def edit(request):
    # Handle changes
    if request.method == 'POST':
        form = EventPostForm(request.POST)
        event_id = request.POST.get('event_id', None)
        if form.is_valid():
            form.clean()
            title = form.cleaned_data['title']
            description = form.cleaned_data['description']
            prize = form.cleaned_data['prize']
            short_description = form.cleaned_data['short_description']
            cat = form.cleaned_data['category']
            cat = category.objects.get(name=cat)
            time = form.cleaned_data['time']
            coordinator1 = Organiser.objects.get(
                email=request.user.email)
            coordinator2 = Organiser.objects.get(
                email=form.cleaned_data['second_coordinator'])
            try:
                requested_event = event_list.objects.get(f_uuid=event_id)
            except event_list.DoesNotExist:
                return render(request,
                              'events/editor.html',
                              {'error': 'Sorry.. cannot find the event.'})
            if request.user not in [requested_event.c_uuid.coordinator1, requested_event.c_uuid.coordinator2]:
                return render(request,
                              'events/editor.html',
                              {'error': 'You don\'t seem to have the keys to the forbiden palace'})
            # generate new uuid
            new_uuid = uuid.uuid4().get_hex()
            new_event = event(
                uuid=new_uuid,
                f_uuid=event_id,
                title=title,
                description=description,
                short_description= short_description,
                prize = prize,
                coordinator1=coordinator1,
                coordinator2=coordinator2,
                time=time,
                timestamp=timezone.now(),
            )
            volunteer1 = form.cleaned_data.get('volunteer1', None)
            volunteer2 = form.cleaned_data.get('volunteer2', None)
            location = form.cleaned_data.get('location', None)
            cover_image_link = form.cleaned_data.get('cover_image_link', None)
            if volunteer1:
                volunteer1 = Organiser.objects.get(email=volunteer1)
                new_event.volunteer1 = volunteer1
            if volunteer2:
                volunteer2 = Organiser.objects.get(email=volunteer2)
                new_event.volunteer2 = volunteer2
            if location:
                new_event.location = location
            if cover_image_link:
                new_event.cover_image_link = cover_image_link
            new_event.save()
            requested_event.l_uuid = new_event
            requested_event.category = cat
            requested_event.save()
            return render(request, 'events/index.html', {'events': [new_event]})
        else:
            return render(request,
                          'events/editor.html',
                          {'action': 'edit',
                           'form': form, 'id': event_id})
    # Display the edit form with story
    else:
        event_id = request.GET.get('id', None)
        try:
            requested_event = event_list.objects.get(f_uuid=event_id)
            requested_event_current = requested_event.c_uuid
        except event_list.DoesNotExist:
            return render(request,
                          'events/editor.html',
                          {'error': 'Event doesn\'t exist..'})
        if request.user not in [requested_event_current.coordinator1, requested_event_current.coordinator2]:
            return render(request,
                          'events/editor.html',
                          {'error': 'You don\'t seem to have the keys to the forbiden palace'})
        initial = {}
        initial['title'] = requested_event_current.title
        initial['description'] = requested_event_current.description
        initial['location'] = requested_event_current.location
        initial['cover_image_link'] = requested_event_current.cover_image_link
        initial['time'] = requested_event_current.time.strftime("%d/%m/%Y %I:%M %p")
        initial['volunteer1'] = requested_event_current.volunteer1
        initial['volunteer2'] = requested_event_current.volunteer2
        initial['category'] = requested_event.category
        initial['short_description'] = requested_event_current.short_description
        initial['prize'] = requested_event_current.prize
        if request.user == requested_event_current.coordinator1:
            initial['second_coordinator'] = requested_event_current.coordinator2
        else:
            initial['second_coordinator'] = requested_event_current.coordinator1
        form = EventPostForm(initial=initial)
        return render(request,
                      'events/editor.html',
                      {'form': form, 'id': event_id, 'action': 'edit', })


@login_required
@user_passes_test(lambda u: u.is_organiser)
def delete(request):
    pass

@login_required
def register(request):
    event_id = request.GET.get('id', None)
    try:
        requested_event = event_list.objects.get(f_uuid=event_id)
    except event_list.DoesNotExist:
        return render(request,
                      'events/register.html',
                      {'error': 'Event doesn\'t exist..'})
    participant = Participant.objects.get(email=request.user.email)
    try:
        requested_event.participant.get(email=request.user.email)
        return render(request,
                      'events/register.html',
                      {'error': 'Already registered..'})
    except Participant.DoesNotExist:
        requested_event.participant.add(participant)
        return render(request,
              'events/register.html',
              {'success': 'registration successful'})

def show(request):
    if request.is_ajax:
        # for a particular event
        if 'category' in request.GET:
            requseted_category = request.GET['category']
            try:
                requseted_category =category.objects.get(name=requseted_category)
                requested_events = requseted_category.event_list_set.all()
                json_response = []
                for e in requested_events:
                    json_response.append(json.dumps({
                                     'id': smart_str(e.f_uuid),
                                     'tag_text_short': smart_str(e.category),
                                     'name_text': smart_str(e.c_uuid.title),
                                     'preview_details_text': smart_str(e.c_uuid.short_description),
                                     'prize_money': 'lots',
                                     'poster': smart_str(e.c_uuid.cover_image_link)
                                     }))
                json_response = json.dumps(json_response)
                return HttpResponse(json_response,
                                    content_type='application/json')
            except category.DoesNotExist:
                json_response = json.dumps({
                    'status': 400, 'message': 'category does not exist.'})
                return HttpResponse(json_response,
                                    content_type='application/json')
        elif 'id' in request.GET:
            id = request.GET['id']
            try:
                requested_event = event_list.objects.get(f_uuid=id)
                json_response = json.dumps({
                    'status': 200,
                    'id': smart_str(requested_event.c_uuid.f_uuid),
                    'tag_text_short': smart_str(requested_event.category),
                    'name_text': smart_str(requested_event.c_uuid.title),
                    'preview_details_text': smart_str(requested_event.c_uuid.short_description),
                    'prize_money': 'lots',
                    'poster': smart_str(requested_event.c_uuid.cover_image_link),
                    'description': smart_str(requested_event.c_uuid.description)
                    })
                return HttpResponse(json_response,
                                    content_type='application/json')
            except event_list.DoesNotExist:
                json_response = json.dumps({
                    'status': 400, 'message': 'event does not exist.'})
                return HttpResponse(json_response,
                                    content_type='application/json')
        else:
            all_category = category.objects.all()
            json_response = []
            for c in all_category:
                cat_events = c.event_list_set.all()
                events_json = []
                for e in cat_events:
                    events_json.append({
                                     'id': smart_str(e.f_uuid),
                                     'tag_text_short': smart_str(e.category),
                                     'name_text': smart_str(e.c_uuid.title),
                                     'preview_details_text': smart_str(e.c_uuid.short_description),
                                     'prize_money': 'lots',
                                     'poster': smart_str(e.c_uuid.cover_image_link),
                                     'description': smart_str(e.c_uuid.description),
                                     'coordinator1': smart_str(e.c_uuid.coordinator1),
                                     'coordinator2': smart_str(e.c_uuid.coordinator2)
                                     })
                json_response.append({'name': c.name, 'description': c.description, 'events': events_json})
            json_response = json.dumps(json_response)
            return HttpResponse(json_response, content_type='application/json')
    else:
        events = event_list.objects.all()
        return render(request, 'events/index.html', {'events': events})

