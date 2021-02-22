from django.urls import path
from . import views

app_name = 'processing'

urlpatterns = [
    path('', views.index, name="index view"),
    path('start_task/', views.add_task, name="start_task")
]
