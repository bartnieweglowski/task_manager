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
    
@api_view(['POST'])     
def start_task(request, pk):
    task = Task.objects.get(pk=pk)
    task.start_time = timezone.now()
    task.save()
    return JsonResponse({'status': 'Task timing started'})

@api_view(['POST'])
def stop_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if task.start_time:
        elapsed_time = (timezone.now() - task.start_time).total_seconds()
        task.update_time_spent(elapsed_time)
        task.start_time = None  
        task.save()
        return Response({'status': 'stopped', 'time_spent': task.time_spent})
    return Response({'error': 'Task was not started'}, status=400)

@api_view(['POST'])
def end_task(request, pk):
    task = Task.objects.get(pk=pk)
    if task.start_time:
        time_diff = timezone.now() - task.start_time
        task.time_spent += int(time_diff.total_seconds())
        task.start_time = None 
        task.save()
    return JsonResponse({'status': 'Task timing ended', 'time_spent': task.time_spent})
    
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
    counts = Task.objects.values('status').annotate(total=Count('status')).order_by('status')
    
    counts_dict = {count['status']: count['total'] for count in counts}
    
    return JsonResponse(counts_dict)

@api_view(['GET'])
def task_priority_counts(request):
    counts = Task.objects.values('priority').annotate(total=Count('priority')).order_by('priority')
    
    counts_dict = {count['priority']: count['total'] for count in counts}
    
    return JsonResponse(counts_dict)

@api_view(['GET'])
def task_assignee_counts(request):
    counts = Task.objects.values('assigned_to__username').annotate(total=Count('assigned_to')).order_by('assigned_to')
    
    counts_dict = {count['assigned_to__username']: count['total'] for count in counts if count['assigned_to__username']}
    
    return JsonResponse(counts_dict)




def index(request):
    return render(render, "index.html")