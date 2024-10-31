# from django.shortcuts import get_object_or_404
# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.exceptions import NotFound, ValidationError
# from django.core.exceptions import ObjectDoesNotExist
# from .models import Event, EventCategory
# from .serializers import EventSerializer, EventCategorySerializer

# # List all event categories with error handling
# class EventCategoryList(generics.ListAPIView):
#     queryset = EventCategory.objects.all()
#     serializer_class = EventCategorySerializer

#     def get(self, request, *args, **kwargs):
#         try:
#             return super().get(request, *args, **kwargs)
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Failed to list categories: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

# # Create a new category with error handling
# class CreateCategory(generics.CreateAPIView): 
#     serializer_class = EventCategorySerializer

#     def create(self, request, *args, **kwargs):
#         try:
#             serializer = self.get_serializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             self.perform_create(serializer)
#             return Response(
#                 {
#                     "status": "success",
#                     "message": "Category created successfully.",
#                     "data": serializer.data,
#                 },
#                 status=status.HTTP_201_CREATED,
#             )
#         except ValidationError as e:
#             return Response(
#                 {"status": "error", "message": str(e)},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Error creating category: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

# # Update an event category with error handling
# class UpdateCategory(generics.UpdateAPIView):
#     queryset = EventCategory.objects.all()
#     serializer_class = EventCategorySerializer

#     def update(self, request, *args, **kwargs):
#         try:
#             category = self.get_object()  # Fetch category or raise 404
#             serializer = self.get_serializer(category, data=request.data, partial=True)
#             serializer.is_valid(raise_exception=True)
#             self.perform_update(serializer)
#             return Response(
#                 {"status": "success", "message": "Category updated.", "data": serializer.data},
#                 status=status.HTTP_200_OK,
#             )
#         except ValidationError as e:
#             return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         except EventCategory.DoesNotExist:
#             raise NotFound(detail="Category not found.")
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Error updating category: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

# # Delete an event category with error handling
# class DeleteCategory(generics.DestroyAPIView):
#     queryset = EventCategory.objects.all()
#     serializer_class = EventCategorySerializer

#     def destroy(self, request, *args, **kwargs):
#         try:
#             category = self.get_object()  # Fetch category or raise 404
#             self.perform_destroy(category)
#             return Response(
#                 {"status": "success", "message": "Category deleted."},
#                 status=status.HTTP_200_OK,
#             )
#         except EventCategory.DoesNotExist:
#             raise NotFound(detail="Category not found.")
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Error deleting category: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

# # List events by category ID with error handling
# class EventListByCategory(generics.ListAPIView):
#     serializer_class = EventSerializer

#     def get_queryset(self):
#         category_id = self.kwargs.get('category_id')
#         try:
#             return Event.objects.filter(category__id=category_id)
#         except ObjectDoesNotExist:
#             raise NotFound(detail="Category not found.")
#         except Exception as e:
#             raise ValidationError(detail=f"Error retrieving events: {str(e)}")

# # Create a sport event with error handling
# class AddSportEvent(generics.CreateAPIView):
#     serializer_class = EventSerializer

#     def create(self, request, *args, **kwargs):
#         try:
#             data = request.data
#             data['category'] = 'Sport'
#             serializer = self.get_serializer(data=data)
#             serializer.is_valid(raise_exception=True)
#             self.perform_create(serializer)
#             return Response(
#                 {"status": "success", "message": "Sport event added.", "data": serializer.data},
#                 status=status.HTTP_200_OK,
#             )
#         except ValidationError as e:
#             return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Error adding sport event: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

# # Create a musical show event with error handling
# class AddMusicalShowEvent(generics.CreateAPIView):
#     serializer_class = EventSerializer

#     def create(self, request, *args, **kwargs):
#         try:
#             data = request.data
#             data['category'] = 'Musical Show'
#             serializer = self.get_serializer(data=data)
#             serializer.is_valid(raise_exception=True)
#             self.perform_create(serializer)
#             return Response(
#                 {"status": "success", "message": "Musical show event added.", "data": serializer.data},
#                 status=status.HTTP_200_OK,
#             )
#         except ValidationError as e:
#             return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Error adding musical show: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

# # Create an other function event with error handling
# class AddOtherFunctionEvent(generics.CreateAPIView):
#     serializer_class = EventSerializer

#     def create(self, request, *args, **kwargs):
#         try:
#             data = request.data
#             data['category'] = 'Other Function'
#             serializer = self.get_serializer(data=data)
#             serializer.is_valid(raise_exception=True)
#             self.perform_create(serializer)
#             return Response(
#                 {"status": "success", "message": "Other function event added.", "data": serializer.data},
#                 status=status.HTTP_200_OK,
#             )
#         except ValidationError as e:
#             return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response(
#                 {"status": "error", "message": f"Error adding other function: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             )

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.http import Http404
from .models import Event
from .serializers import EventSerializer

class EventCreateAPIView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            return Response(
                {
                    "message": "Event created successfully!",
                    "event": response.data
                },
                status=status.HTTP_201_CREATED
            )
        except ValidationError as e:
            return Response(
                {"errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {
                    "error": "An unexpected error occurred.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def list(self, request, *args, **kwargs):
        try:
            events = self.get_queryset()
            if not events:
                return Response(
                    {"message": "No events found."},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = self.get_serializer(events, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Http404:
            return Response(
                {"error": "Events not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {
                    "error": "An unexpected error occurred.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EventDetailAPIView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            event = self.get_object()
            serializer = self.get_serializer(event)
            return Response(
                {"success": True, "data": serializer.data},
                status=status.HTTP_200_OK
            )
        except Http404:
            return Response(
                {"success": False, "error": "Event not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "error": "An unexpected error occurred.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EventUpdateAPIView(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def update(self, request, *args, **kwargs):
        try:
            # Try to retrieve the existing event
            event = self.get_object()
            
            # Serialize the updated data
            serializer = self.get_serializer(event, data=request.data, partial=True)  # `partial=True` allows partial updates (PATCH)
            serializer.is_valid(raise_exception=True)
            
            # Save the updated event
            serializer.save()
            
            # Return success response
            return Response(
                {"success": True, "message": "Event updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        except Http404:
            return Response(
                {"success": False, "error": "Event not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "error": "An unexpected error occurred.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class EventDeleteAPIView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            # Attempt to retrieve and delete the event
            event = self.get_object()
            event.delete()
            
            # Return success response
            return Response(
                {"success": True, "message": "Event deleted successfully."},
                status=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return Response(
                {"success": False, "error": "Event not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "error": "An unexpected error occurred.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
