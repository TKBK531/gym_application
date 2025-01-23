# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Equipment
from .serializers import EquipmentSerializer
from rest_framework.permissions import AllowAny
from sport.models import Sport

class EquipmentListView(generics.ListAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        # Filter the queryset
        queryset = self.filter_queryset(self.get_queryset())
        
        # Handle pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = self.add_sport_labels(serializer.data)
            return self.get_paginated_response(data)
        
        # Serialize the data
        serializer = self.get_serializer(queryset, many=True)
        data = self.add_sport_labels(serializer.data)
        return Response(
            {
                "status": "success",
                "message": "All equipment retrieved successfully.",
                "data": data,
            },
            status=status.HTTP_200_OK,
        )

    def add_sport_labels(self, data):
        for item in data:
            sport = Sport.objects.get(id=item['sport'])
            item['sport_label'] = sport.label
        return data
 
class EquipmentCreateView(generics.CreateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        response_data = {
            "status": "success",
            "message": "Item added successfully.",
            "data": serializer.data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers) 
      
class EquipmentUpdateView(generics.UpdateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Only allow `count` to be updated
        data = {'count': request.data.get('count')}
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_data = {
            "status": "success",
            "message": "Item updated successfully.",
            "data": serializer.data,
        }
        return Response(response_data)

class EquipmentIncreaseCountView(generics.UpdateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Increase the count by the value provided in the request, defaulting to 1
        increase_by = int(request.data.get('count', 1))
        instance.count += increase_by
        instance.save()

        response_data = {
            "status": "success",
            "message": "Count increased successfully.",
            "data": {
                "id": instance.id,
                "count": instance.count,
            },
        }
        return Response(response_data)
    
class EquipmentDecreaseCountView(generics.UpdateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Decrease the count by the value provided in the request, defaulting to 1
        decrease_by = int(request.data.get('count', 1))
        instance.count -= decrease_by

        # Ensure count doesn't drop below zero (optional)
        if instance.count < 0:
            instance.count = 0

        instance.save()

        response_data = {
            "status": "success",
            "message": "Count decreased successfully.",
            "data": {
                "id": instance.id,
                "count": instance.count,
            },
        }
        return Response(response_data)

class EquipmentDeleteView(generics.DestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {
                "status": "success",
                "message": "Item deleted successfully.",
            },
            status=status.HTTP_204_NO_CONTENT,
        )