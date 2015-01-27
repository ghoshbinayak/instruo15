from django.shortcuts import render

# Create your views here.


def home(request):
    numofcontacts = range(6)
    return render(request, 'main/index.html', {'numofcontacts': numofcontacts})
