from django.shortcuts import render
from django.urls import reverse
from .models import ProcessingTask

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


def run_task(cmd_call):
    subprocess.check_call(cmd_call)


def add_task():
    # Get last position in queue.
    tasks = ProcessingTask.objects.order_by('-position')
    print("TYPE OF THING")
    print(type(tasks.first()))
    print(tasks)
    current_queue_length = tasks.first().position
    print("Suggested pos: " + str(current_queue_length + 1))

    # Create new task.
    task = ProcessingTask()
    task.title = "Just another task"
    task.added_by = "Mikael"
    task.position = current_queue_length + 1
    task.call = "python C:/utveckling/Django/queue_gui/print_tet.py TaskID: " + str(task.position)
    task.save()

    # Start the task (nevermind the queue position right now).
    print("task.call")
    print(task.call)
    print(type(task.call))
    thread = threading.Thread(target=run_task, args=[task.call])
    thread.setDaemon(True)
    thread.start()


def index(request):
    print("Entering index function")
    task_list = ProcessingTask.objects.all()
    log_folder = "C:/utveckling/Django/queue_gui_processing"

    add_task()

    # for task in task_list:
        # print(task)
        #subprocess.Popen("C:/utveckling/Django/queue_gui/print_tet.py", stdout=)

    return render(request, 'processing/index.html')
