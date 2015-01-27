from django import forms as django_forms
from accounts.models import Organiser
from django.utils import timezone
import bleach
import re
from django.forms.widgets import Select
from events.models import category

# CATEGORIES = ('', '')
# for cata in category.objects.all():
#     CATEGORIES = CATEGORIES, (cata.id, cata.name)


class EventPostForm(django_forms.Form):
    title = django_forms.CharField(
        max_length=500,
        widget=django_forms.TextInput(
            attrs={'placeholder': 'Event Name'}))
    cover_image_link = django_forms.CharField(
        max_length=256,
        widget=django_forms.TextInput(
            attrs={'placeholder': 'Event Poster Link.'}))
    time = django_forms.DateTimeField(
        input_formats=['%d/%m/%Y %I:%M %p',
                       '%d/%m/%Y'],
        widget=django_forms.DateTimeInput(
            attrs={'placeholder': 'Time of the Event.',
                   'data-date-format': 'DD/MM/YYYY hh:mm A'
                   }))
    location = django_forms.CharField(
        max_length=256,
        widget=django_forms.TextInput(
            attrs={'placeholder': 'Location of the Event.'}))
    # category = django_forms.ChoiceField(required=True, widget=Select,
    # choices=category.objects.values_list('id', 'name'))
    category = django_forms.ModelChoiceField(
        queryset=category.objects.all(), required=True, empty_label=None)
    short_description = django_forms.CharField(widget=django_forms.Textarea)
    description = django_forms.CharField(widget=django_forms.Textarea)
    second_coordinator = django_forms.EmailField(
        widget=django_forms.EmailInput(
            attrs={'placeholder': 'Email of Second Coordinator.'}))
    volunteer1 = django_forms.EmailField(
        required=False,
        widget=django_forms.EmailInput(
            attrs={'placeholder': 'Email of Volunteer 1'}))
    volunteer2 = django_forms.EmailField(
        required=False,
        widget=django_forms.EmailInput(
            attrs={'placeholder': 'Email of Volunteer 2'}))

    def clean(self):
        cleaned_data = super(EventPostForm, self).clean()

        # validate time
        time = cleaned_data.get("time")

        if time and (time - timezone.now()).days < 0:
            self.add_error(
                'time', django_forms.ValidationError(
                    "You can't do time travell!!"))

        # validate coordinator
        co2 = cleaned_data.get("second_coordinator")
        if co2:
            try:
                co2 = Organiser.objects.get(email=co2)
                if not co2.is_organiser:
                    self.add_error('second_coordinator',
                                   django_forms.ValidationError(
                                       "Not a instruo event organiser."))
            except Organiser.DoesNotExist:
                self.add_error('second_coordinator',
                               django_forms.ValidationError(
                                   "Not a instruo event organiser."))

        # validate volunteers
        vol1 = cleaned_data.get("volunteer1", None)
        vol2 = cleaned_data.get("volunteer2", None)
        if vol1:
            try:
                Organiser.objects.get(email=vol1)
            except Organiser.DoesNotExist:
                self.add_error('volunteer1',
                               django_forms.ValidationError(
                                   "Not a instruo event organiser."))
        if vol2:
            try:
                Organiser.objects.get(email=vol2)
            except Organiser.DoesNotExist:
                self.add_error('volunteer2',
                               django_forms.ValidationError(
                                   "Not a instruo event organiser."))

        # clean description with python bleach
        body = cleaned_data.get("body")

        def filter_src(name, value):
            if name in ('width', 'height', 'frameborder', 'allowfullscreen'):
                return True
            if name == 'src':
                exp = r'^//www\.youtube\.com/embed/.*$'
                match = re.search(exp, value)
                if match:
                    return True
            return False
        white_list_tags = [u'h2', u'p', u'a', u'img', u'ol', u'ul', u'li',
                           u'strong', u'em', u'blockquote', u'sub', u'sup',
                           u'iframe', u'br']
        white_list_attrs = {
            'a': ['href', 'target', 'title'],
            'img': ['alt', 'title', 'width', 'height', 'src'],
            'iframe': filter_src
        }
        white_list_styles = ['padding', 'padding-left']
        body = bleach.clean(
            body, white_list_tags, white_list_attrs, white_list_styles)
        cleaned_data['body'] = body
        return cleaned_data
