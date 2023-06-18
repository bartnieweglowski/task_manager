from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
from .models import Board, Card

def get_boards(request):
    boards = Board.objects.all()
    data = {'boards': [{'id': board.id, 'title': board.title} for board in boards]}
    return JsonResponse(data)

def get_cards(request, board_id):
    cards = Card.objects.filter(board_id=board_id)
    data = {'cards': [{'id': card.id, 'title': card.title, 'description': card.description, 'status': card.status} for card in cards]}
    return JsonResponse(data)