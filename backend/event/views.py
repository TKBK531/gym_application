from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent
from .serializers import (
    EventSerializer,
    SportEventSerializer,
    MusicalShowEventSerializer,
    OtherFunctionEventSerializer,
)


class CreateEventView(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        event_type = request.data.get("event_type")
        event_data = request.data.get("event")

        if event_type == "sport":
            serializer = SportEventSerializer(data=event_data)
        elif event_type == "musical_show":
            serializer = MusicalShowEventSerializer(data=event_data)
        elif event_type == "other_function":
            serializer = OtherFunctionEventSerializer(data=event_data)
        else:
            return Response(
                {"error": "Invalid event type"}, status=status.HTTP_400_BAD_REQUEST
            )

        if serializer.is_valid():
            serializer.save()

            return_resp = {
                "status": "success",
                "message": f"{event_type} event created successfully",
                "data": serializer.data,
            }

            return JsonResponse(
                return_resp,
                status=status.HTTP_201_CREATED,
            )

        return_resp = {
            "status": "fail",
            "message": f"Failed to create {event_type} event",
            "data": serializer.errors,
        }

        return Response(
            return_resp,
            status=status.HTTP_400_BAD_REQUEST,
        )


class ListAllEventsView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
