from django.shortcuts import render
from django.urls import reverse


def index(request):
    print("THIS IS IT")
    return render(request, 'processing/index.html')
