from django.urls import path
from kanban.views import get_boards, get_cards

urlpatterns = [
    path('', get_boards),
    path('boards/', get_boards),
    path('boards/<int:board_id>/cards/', get_cards),
]