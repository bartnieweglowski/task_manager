from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
from django.utils.timesince import timesince

class UserSerializer(serializers.ModelSerializer):
    
    fullName = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'fullName', 'first_name', 'last_name']  

    def get_fullName(self, obj):
        return obj.get_full_name() or obj.username   


class TaskSerializer(serializers.ModelSerializer):
    assignedUser = serializers.PrimaryKeyRelatedField(
        write_only=True,  
        source='assigned_to', 
        queryset=User.objects.all(),
        allow_null=True,
        required=False
    )
    assignedUserDetail = UserSerializer(read_only=True, source='assigned_to') 

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'status', 'description', 'assigned_date',
            'time_spent', 'labels', 'priority', 'start_date', 'end_date',
            'assigned_to', 'assignedUser', 'assignedUserDetail', 'start_time', 'end_time'
        ]
        extra_kwargs = {
            'assigned_to': {'read_only': True}  
        }
