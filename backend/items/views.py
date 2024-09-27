from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Item, Sport
from .serializers import ItemSerializer
from django.http import JsonResponse


class ItemCreateView(APIView):
    def post(self, request):
        # Get the sport label from the request data
        sport_label = request.data.get("sport")

        if not sport_label:
            return Response(
                {"error": "Sport label is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Find the sport object based on the label
            sport = Sport.objects.get(label=sport_label)
        except Sport.DoesNotExist:
            return Response(
                {"error": "Sport not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Include the sport in the data to be serialized
        item_data = request.data.copy()
        item_data["sport"] = (
            sport.id
        )  # Assuming sport is a foreign key in the Item model

        # Serialize the data
        serializer = ItemSerializer(data=item_data)
        if serializer.is_valid():
            serializer.save()  # This will call the `create` method of the serializer
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemListView(APIView):
    def get(self, request):
        items = Item.objects.all()  # Get all items from the database
        serializer = ItemSerializer(items, many=True)  # Serialize the items

        # for data in serializer.data:
        #     data["sport"] = Sport.objects.get(id=data["sport"])

        # print(serializer.data)

        return_resp = {
            "status": "success",
            "data": serializer.data,  # The serialized data is in the 'data' field of the response
            "message": "Items retrieved successfully",  # A simple message to indicate the success of the request
        }

        return JsonResponse(return_resp)
