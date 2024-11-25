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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
