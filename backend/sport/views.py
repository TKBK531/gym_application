from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Sport
from .serializers import SportSerializer


# Create your views here.
class SportListView(generics.ListAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [AllowAny]
