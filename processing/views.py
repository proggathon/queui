from django.shortcuts import render
from django.urls import reverse
from .models import ProcessingTask
from django.http import HttpResponse

import json
import subprocess
import threading


# I imagine we want a call_task() function and an on_task_finished() function here.
# The latter would move the task from the database to a separate "finished" database, call the next task
# and update all the queue positions in the database.
# An alternative would be to call python function asynchronously on server start that performs the cmd call at
# the top of the queue, then goes on with the next task, updating queue positions.
# If no task exists, the process might wait a few seconds and then poll the database again.


def start_processing():
    # Get first task in processing queue.
    pass


def run_task(task):
    subprocess.check_call(task.call)
    task.is_done = True
    task.save()


def add_task(request):  # TODO Can we get rid of the need to have the request arg here?
    # Get last position in queue.
    tasks = ProcessingTask.objects.order_by('-position')
    current_queue_length = tasks.first().position
    print("Suggested pos: " + str(current_queue_length + 1))
    print(request.POST)
    # print(json.loads(request.body))

    # Create new task.
    task = ProcessingTask()
    task.title = "Just another task"
    task.added_by = "Mikael"
    task.position = current_queue_length + 1
    task.call = "python C:/utveckling/Django/queue_gui/print_tet.py TaskID:" + str(task.position)
    task.save()

    # Start the task (nevermind the queue position right now).  # TODO This should be moved to run_task()
    thread = threading.Thread(target=run_task, args=[task], daemon=True)
    thread.start()

    return HttpResponse(str(task.position))  # TODO THis should probably be a JsonResponse later


def index(request):
    print("Entering index function")
    task_list = ProcessingTask.objects.all()
    log_folder = "C:/utveckling/Django/queue_gui_processing"

    default_command = "python C:/utveckling/Django/queue_gui/print_tet.py whatevs"

    return render(request, 'processing/index.html', {'start_text': default_command})
