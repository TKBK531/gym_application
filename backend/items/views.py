from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer

# Create your views here.
class ItemCreateView(APIView):
    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This will call the `create` method of the serializer
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ItemListView(APIView):
    def get(self, request):
        items = Item.objects.all()  # Get all items from the database
        serializer = ItemSerializer(items, many=True)  # Serialize the items
        return Response(serializer.data)  # Return the serialized data in JSON format   