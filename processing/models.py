from django.db import models

# Create your models here.


class ProcessingTask(models.Model):
    # Title of the task.
    title = models.CharField(default="Task", max_length=200)

    # Name of person who added the task.
    added_by = models.CharField(max_length=200)

    # Position in queue. No default value as this depends on queue length.
    position = models.PositiveIntegerField(unique=True)

    # Whether task is done.
    is_done = models.BooleanField(default=False)

    # The command line call.
    call = models.CharField(max_length=8191)  # Max length chosen from Windows cmd max call length.

    # TODO Add timestamp of creation and completion.

    def __str__(self):
        message = self.title + ", Position: " + str(self.position)
        return message
