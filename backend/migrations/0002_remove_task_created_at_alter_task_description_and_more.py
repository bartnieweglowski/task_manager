# Generated by Django 4.2.7 on 2023-12-27 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='created_at',
        ),
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.TextField(blank=True, default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(default='Todo', max_length=50),
        ),
    ]
