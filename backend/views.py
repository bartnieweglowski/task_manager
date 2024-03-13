from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from django.shortcuts import render 
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.shortcuts import get_list_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.contrib.auth.models import User
from django.utils import timezone


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=True, methods=['post'])
    def assign_date(self, request, pk=None):
        task = get_object_or_404(Task, pk=pk)
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        if start_date:
            task.start_date = start_date
        if end_date:
            task.end_date = end_date
        task.save()
        return Response({"status": "dates assigned"}) 
       
@api_view(['POST'])
def start_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.start_time = timezone.now()
    task.save()
    return Response({'status': 'Task timing started', 'start_time': task.start_time})

@api_view(['POST'])
def end_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.end_time = timezone.now()
    task.save()
    return Response({'status': 'Task timing ended', 'end_time': task.end_time})
    
@csrf_exempt
def task_list(request):
    """
    List all tasks, or create a new task.
    """
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def task_detail(request, id):
    """
    Retrieve, update or delete a task.
    """
    try:
        task = Task.objects.get(pk=id)
    except Task.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(task, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        task.delete()
        return HttpResponse(status=204)
    
def task_status_counts(request):
    # Agregowanie zadań według statusu
    counts = Task.objects.values('status').annotate(total=Count('status')).order_by('status')
    
    # Przekształcanie wyników w słownik
    counts_dict = {count['status']: count['total'] for count in counts}
    
    return JsonResponse(counts_dict)

@api_view(['GET'])
def task_priority_counts(request):
    # Agregowanie zadań według priorytetu
    counts = Task.objects.values('priority').annotate(total=Count('priority')).order_by('priority')
    
    # Przekształcanie wyników w słownik
    counts_dict = {count['priority']: count['total'] for count in counts}
    
    return JsonResponse(counts_dict)

@api_view(['GET'])
def task_assignee_counts(request):
    # Agregowanie zadań według przypisanych użytkowników
    counts = Task.objects.values('assigned_to__username').annotate(total=Count('assigned_to')).order_by('assigned_to')
    
    # Przekształcanie wyników w słownik
    counts_dict = {count['assigned_to__username']: count['total'] for count in counts if count['assigned_to__username']}
    
    return JsonResponse(counts_dict)

    


def index(request):
    return render(render, "index.html")