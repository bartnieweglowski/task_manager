# Generated by Django 4.2.7 on 2024-01-02 17:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_remove_task_priority_task_due_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='due_date',
        ),
    ]
