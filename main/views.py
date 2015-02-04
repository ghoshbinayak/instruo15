from django.shortcuts import render

# Create your views here.


def home(request):
    numofcontacts = range(6)
    numofsponsors = range(10)
    return render(request, 'main/index.html', {'numofcontacts': numofcontacts, 'numofsponsors': numofsponsors})
