from django.shortcuts import render

import events

eventlist = events.models.category.objects.all()
def home(request):
    numofcontacts = range(6)
    numofsponsors = range(10)
    return render(request, 'main/index.html', {'numofcontacts': numofcontacts,
                                               'numofsponsors': numofsponsors,
                                               'eventlist': eventlist
                                               })
