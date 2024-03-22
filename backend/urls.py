"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import index
from django.contrib import admin 
from .views import task_list, task_detail, task_status_counts, UserList, task_priority_counts, task_assignee_counts, start_task, end_task, stop_task
from .views import TaskViewSet 
from django.views.generic import TemplateView


router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include(router.urls)),
    path('',index,name="index"),
    path('api/task-status-counts/', task_status_counts, name='task-status-counts'),
    path('api/task-priority-counts/', task_priority_counts, name='task-priority-counts'),
    path('api/task-assignee-counts/', task_assignee_counts, name='task-assignee-counts'),
    path('tasks/', task_list),
    path('tasks/<int:pk>/start/', start_task, name='start_task'),
    path('tasks/<int:pk>/end/', end_task, name='end_task'),
    path('tasks/<int:pk>/stop/', stop_task, name='stop_task'),
    path('tasks/<int:pk>/', task_detail),
    path('api/users/', UserList.as_view(), name='user-list'),
    path('', TemplateView.as_view(template_name='index.html'))
  
]
