# Generated by Django 4.2.7 on 2023-12-31 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_task_labels'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='priority',
            field=models.CharField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], default='medium', max_length=6),
        ),
    ]
