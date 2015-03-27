from django.shortcuts import render

from events.models import category
# Create your views here.

# eventlist = [
#     {'name': 'Game on', 'tag': 'Gaming',
#         'img': '/static/main/img/events/pic2.jpg'},
#     {'name': 'Automaton', 'tag': 'Robotics',
#         'img': '/static/main/img/events/pic17.jpg',
#         'link': 'http://robodarshan.iiests.ac.in/'},
#     {'name': 'The Junkie', 'tag': 'Mechanics',
#         'img': '/static/main/img/events/pic15.jpg'},
#     {'name': 'War of the Titans', 'tag': 'Special event',
#         'img': '/static/main/img/events/pic7.jpg'},
#     {'name': 'Mathmania', 'tag': 'General',
#         'img': '/static/main/img/events/pic11.jpg'},
#     {'name': 'Faceoff', 'tag': 'Debate',
#         'img': '/static/main/img/events/pic4.jpg'},
#     {'name': 'Electronicaz', 'tag': 'Electronics',
#         'img': '/static/main/img/events/pic9.jpg'},
#     {'name': 'Plan masterz', 'tag': 'Business',
#         'img': '/static/main/img/events/pic6.jpg'},
#     {'name': 'Prasnavali', 'tag': 'Quiz',
#         'img': '/static/main/img/events/pic14.jpg'},
#     {'name': 'Open Design', 'tag': 'Special event',
#         'img': '/static/main/img/events/pic16.jpg'},
#     {'name': 'Papyrus', 'tag': 'paper presentation',
#         'img': '/static/main/img/events/pic10.jpg'}
# ]

eventlist = category.objects.all()

def home(request):
    numofcontacts = range(6)
    numofsponsors = range(10)
    return render(request, 'main/index.html', {'numofcontacts': numofcontacts,
                                               'numofsponsors': numofsponsors,
                                               'eventlist': eventlist
                                               })
