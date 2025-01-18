# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
# from .models import Item, Sport
# from .serializers import ItemSerializer
# from django.http import JsonResponse


# class ItemCreateView(APIView):
#     def post(self, request):
#         # Get the sport label from the request data
#         sport_label = request.data.get("sport")

#         if not sport_label:
#             return Response(
#                 {"error": "Sport label is required"}, status=status.HTTP_400_BAD_REQUEST
#             )

#         try:
#             # Find the sport object based on the label
#             sport = Sport.objects.get(label=sport_label)
#         except Sport.DoesNotExist:
#             return Response(
#                 {"error": "Sport not found"}, status=status.HTTP_404_NOT_FOUND
#             )

#         # Include the sport in the data to be serialized
#         item_data = request.data.copy()
#         item_data["sport"] = (
#             sport.id
#         )  # Assuming sport is a foreign key in the Item model

#         # Serialize the data
#         serializer = ItemSerializer(data=item_data)
#         if serializer.is_valid():
#             serializer.save()  # This will call the `create` method of the serializer
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ItemListView(APIView):
#     def get(self, request):
#         items = Item.objects.all()  # Get all items from the database
#         serializer = ItemSerializer(items, many=True)  # Serialize the items

#         # for data in serializer.data:
#         #     data["sport"] = Sport.objects.get(id=data["sport"])

#         # print(serializer.data)

#         return_resp = {
#             "status": "success",
#             "data": serializer.data,  # The serialized data is in the 'data' field of the response
#             "message": "Items retrieved successfully",  # A simple message to indicate the success of the request
#         }

#         return JsonResponse(return_resp)

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

