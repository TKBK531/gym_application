from django.http import JsonResponse
from django.utils import timezone
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from userProfile.utils import is_admin_user, is_staff_user

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

        if event_type == "sports":
            serializer = SportEventSerializer(data=event_data)
        elif event_type == "musical_shows":
            serializer = MusicalShowEventSerializer(data=event_data)
        elif event_type == "other_functions":
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


class ListSportEventsView(generics.ListAPIView):
    queryset = SportEvent.objects.all()
    serializer_class = SportEventSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            sport_events = SportEvent.objects.all()
            data = SportEventSerializer(sport_events, many=True).data
            return JsonResponse(
                {"status": "success", "data": data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ListMusicalShowEventsView(generics.ListAPIView):
    queryset = MusicalShowEvent.objects.all()
    serializer_class = MusicalShowEventSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            musical_show_events = MusicalShowEvent.objects.all()
            data = MusicalShowEventSerializer(musical_show_events, many=True).data
            return JsonResponse(
                {"status": "success", "data": data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ListOtherFunctionEventsView(generics.ListAPIView):
    queryset = OtherFunctionEvent.objects.all()
    serializer_class = OtherFunctionEventSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            other_function_events = OtherFunctionEvent.objects.all()
            data = OtherFunctionEventSerializer(other_function_events, many=True).data
            return JsonResponse(
                {"status": "success", "data": data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DeleteEventView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            user_id = request.user.id
            if not (is_admin_user(user_id) or is_staff_user(user_id)):
                return JsonResponse(
                    {"status": "error", "message": "Permission denied"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            event = self.get_object()
            event.delete()
            return JsonResponse(
                {"status": "success", "message": "Event deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateEventView(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            user_id = request.user.id
            if not (is_admin_user(user_id) or is_staff_user(user_id)):
                return JsonResponse(
                    {"status": "error", "message": "Permission denied"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            event = self.get_object()
            serializer = self.get_serializer(event, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(
                    {
                        "status": "success",
                        "message": "Event updated successfully",
                        "data": serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            return JsonResponse(
                {
                    "status": "fail",
                    "message": "Failed to update event",
                    "data": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class EventsInNext30DaysView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            now = timezone.now().date()
            end_date = now + timezone.timedelta(days=30)
            events = Event.objects.filter(date__range=(now, end_date))
            event_count = events.count()
            events = events[:5]
            event_details = EventSerializer(events, many=True).data

            return JsonResponse(
                {
                    "status": "success",
                    "message": "Events in the next 30 days",
                    "data": {
                        "event_count": event_count,
                        "event_details": event_details,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
