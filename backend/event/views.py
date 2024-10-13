from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Event, EventCategory
from .serializers import EventSerializer

# Create your views here.

# List all event categories
class EventCategoryList(generics.ListAPIView):
    queryset = EventCategory.objects.all()
    serializer_class = EventSerializer

# List events by category ID
class EventListByCategory(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Event.objects.filter(category__id=category_id)

# Generic view to handle creating a sport event
class AddSportEvent(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        data['category'] = 'Sport'  # Assuming 'Sport' exists in your category model

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Generic view to handle creating a musical show event
class AddMusicalShowEvent(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        data['category'] = 'Musical Show'  # Assuming 'Musical Show' exists in your category model

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Generic view to handle creating other function events
class AddOtherFunctionEvent(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        data['category'] = 'Other Function'  # Assuming 'Other Function' exists in your category model

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
