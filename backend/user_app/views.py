from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from.serializers import (
    MyTokenObtainPairSerializer, 
    UserSerializer
    )
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer