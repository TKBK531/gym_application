from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError
from django.core.exceptions import ObjectDoesNotExist
from .models import Event, EventCategory
from .serializers import EventSerializer

# List all event categories with error handling
class EventCategoryList(generics.ListAPIView):
    queryset = EventCategory.objects.all()
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        try:
            return super().get(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"status": "error", "message": f"Failed to list categories: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# List events by category ID with error handling
class EventListByCategory(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        try:
            return Event.objects.filter(category__id=category_id)
        except ObjectDoesNotExist:
            raise NotFound(detail="Category not found.")
        except Exception as e:
            raise ValidationError(detail=f"Error retrieving events: {str(e)}")

# Create a sport event with error handling
class AddSportEvent(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            data['category'] = 'Sport'
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(
                {
                    "status": "success", 
                    "message": "Sport event added.", 
                    "data": serializer.data
                },
                status=status.HTTP_200_OK,
            )
        except ValidationError as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"status": "error", "message": f"Error adding sport event: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# Create a musical show event with error handling
class AddMusicalShowEvent(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            data['category'] = 'Musical Show'
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(
                {"status": "success", "message": "Musical show event added.", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ValidationError as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"status": "error", "message": f"Error adding musical show: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# Create an other function event with error handling
class AddOtherFunctionEvent(generics.CreateAPIView):
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            data['category'] = 'Other Function'
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(
                {"status": "success", "message": "Other function event added.", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ValidationError as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"status": "error", "message": f"Error adding other function: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# Update an event with error handling
class UpdateEvent(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def update(self, request, *args, **kwargs):
        try:
            event = self.get_object()  # Fetch the event or raise 404
            serializer = self.get_serializer(event, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(
                {"status": "success", "message": "Event updated.", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ValidationError as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Event.DoesNotExist:
            raise NotFound(detail="Event not found.")
        except Exception as e:
            return Response(
                {"status": "error", "message": f"Error updating event: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

# Delete an event with error handling
class DeleteEvent(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            event = self.get_object()  # Fetch the event or raise 404
            self.perform_destroy(event)
            return Response(
                {"status": "success", "message": "Event deleted."},
                status=status.HTTP_200_OK,
            )
        except Event.DoesNotExist:
            raise NotFound(detail="Event not found.")
        except Exception as e:
            return Response(
                {"status": "error", "message": f"Error deleting event: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
