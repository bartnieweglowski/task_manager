# Generated by Django 4.2.7 on 2024-01-19 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_remove_task_due_date_remove_task_end_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='assigned_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]