from django.http import JsonResponse

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent
from .serializers import (
    CombinedEventSerializer,
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
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            events = Event.objects.all()
            combined_events = []

            for event in events:
                event_data = EventSerializer(event).data

                if event.sport_event.exists():
                    event_type = "sport"
                    event_details = SportEventSerializer(event.sport_event.first()).data
                elif event.musical_show_event.exists():
                    event_type = "musical_show"
                    event_details = MusicalShowEventSerializer(
                        event.musical_show_event.first()
                    ).data
                elif event.other_function_event.exists():
                    event_type = "other_function"
                    event_details = OtherFunctionEventSerializer(
                        event.other_function_event.first()
                    ).data
                else:
                    event_type = "unknown"
                    event_details = {}

                combined_event = {
                    "event_type": event_type,
                    "event_details": event_details,
                }
                combined_events.append(combined_event)

            return JsonResponse(
                {"status": "success", "data": combined_events},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

