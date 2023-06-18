from django.db import models

class Board(models.Model):
    title = models.CharField(max_length=100)

class Card(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
