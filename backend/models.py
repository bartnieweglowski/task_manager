from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User  
timezone.now()

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    STATUS_CHOICES = (
        ('Todo', 'Todo'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done'),
    )
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Todo')
    time_spent = models.IntegerField(default=0)
    labels = models.JSONField(default=list) 
    assigned_date = models.DateField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)

    @property
    def time_spent(self):
        if self.start_time and self.end_time:
            return self.end_time - self.start_time
        return None
    
    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    ]
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES, default='MEDIUM')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tasks')

    def __str__(self):
        return self.title