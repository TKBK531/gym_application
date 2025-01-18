# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Equipment
from .serializers import EquipmentSerializer
from rest_framework.permissions import AllowAny

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
            return self.get_paginated_response(serializer.data)
        
        # Serialize the data
        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "status": "success",
                "message": "All equipment retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

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
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_data = {
            "status": "success",
            "message": "Item updated successfully.",
            "data": serializer.data,
        }
        return Response(response_data)

class EquipmentDeleteView(generics.DestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        response_data = {
            "status": "success",
            "message": "Item deleted successfully."
        }
        return Response(response_data, status=status.HTTP_204_NO_CONTENT)

