# # from rest_framework import generics, status
# # from rest_framework.response import Response
# # from rest_framework.exceptions import ValidationError
# # from django.http import Http404
# # from .models import Event
# # from .serializers import EventSerializer

# # class EventCreateAPIView(generics.CreateAPIView):
# #     queryset = Event.objects.all()
# #     serializer_class = EventSerializer

# #     def create(self, request, *args, **kwargs):
# #         try:
# #             response = super().create(request, *args, **kwargs)
# #             return Response(
# #                 {
# #                     "message": "Event created successfully!",
# #                     "event": response.data
# #                 },
# #                 status=status.HTTP_201_CREATED
# #             )
# #         except ValidationError as e:
# #             return Response(
# #                 {"errors": e.detail},
# #                 status=status.HTTP_400_BAD_REQUEST
# #             )
# #         except Exception as e:
# #             return Response(
# #                 {
# #                     "error": "An unexpected error occurred.",
# #                     "details": str(e)
# #                 },
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )


# # class EventListAPIView(generics.ListAPIView):
# #     queryset = Event.objects.all()
# #     serializer_class = EventSerializer

# #     def list(self, request, *args, **kwargs):
# #         try:
# #             events = self.get_queryset()
# #             if not events:
# #                 return Response(
# #                     {"message": "No events found."},
# #                     status=status.HTTP_404_NOT_FOUND
# #                 )
# #             serializer = self.get_serializer(events, many=True)
# #             return Response(serializer.data, status=status.HTTP_200_OK)
# #         except Http404:
# #             return Response(
# #                 {"error": "Events not found."},
# #                 status=status.HTTP_404_NOT_FOUND
# #             )
# #         except Exception as e:
# #             return Response(
# #                 {
# #                     "error": "An unexpected error occurred.",
# #                     "details": str(e)
# #                 },
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )

# # class EventDetailAPIView(generics.RetrieveAPIView):
# #     queryset = Event.objects.all()
# #     serializer_class = EventSerializer

# #     def retrieve(self, request, *args, **kwargs):
# #         try:
# #             event = self.get_object()
# #             serializer = self.get_serializer(event)
# #             return Response(
# #                 {"success": True, "data": serializer.data},
# #                 status=status.HTTP_200_OK
# #             )
# #         except Http404:
# #             return Response(
# #                 {"success": False, "error": "Event not found."},
# #                 status=status.HTTP_404_NOT_FOUND
# #             )
# #         except Exception as e:
# #             return Response(
# #                 {
# #                     "success": False,
# #                     "error": "An unexpected error occurred.",
# #                     "details": str(e)
# #                 },
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )

# # class EventUpdateAPIView(generics.UpdateAPIView):
# #     queryset = Event.objects.all()
# #     serializer_class = EventSerializer

# #     def update(self, request, *args, **kwargs):
# #         try:
# #             # Try to retrieve the existing event
# #             event = self.get_object()
            
# #             # Serialize the updated data
# #             serializer = self.get_serializer(event, data=request.data, partial=True)  # `partial=True` allows partial updates (PATCH)
# #             serializer.is_valid(raise_exception=True)
            
# #             # Save the updated event
# #             serializer.save()
            
# #             # Return success response
# #             return Response(
# #                 {"success": True, "message": "Event updated successfully", "data": serializer.data},
# #                 status=status.HTTP_200_OK
# #             )
# #         except Http404:
# #             return Response(
# #                 {"success": False, "error": "Event not found."},
# #                 status=status.HTTP_404_NOT_FOUND
# #             )
# #         except Exception as e:
# #             return Response(
# #                 {
# #                     "success": False,
# #                     "error": "An unexpected error occurred.",
# #                     "details": str(e)
# #                 },
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )
        
# # class EventDeleteAPIView(generics.DestroyAPIView):
# #     queryset = Event.objects.all()
# #     serializer_class = EventSerializer

# #     def destroy(self, request, *args, **kwargs):
# #         try:
# #             # Attempt to retrieve and delete the event
# #             event = self.get_object()
# #             event.delete()
            
# #             # Return success response
# #             return Response(
# #                 {"success": True, "message": "Event deleted successfully."},
# #                 status=status.HTTP_204_NO_CONTENT
# #             )
# #         except Http404:
# #             return Response(
# #                 {"success": False, "error": "Event not found."},
# #                 status=status.HTTP_404_NOT_FOUND
# #             )
# #         except Exception as e:
# #             return Response(
# #                 {
# #                     "success": False,
# #                     "error": "An unexpected error occurred.",
# #                     "details": str(e)
# #                 },
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )

# # views.py

# from django.urls import reverse_lazy
# from django.views.generic import CreateView, ListView
# from django.http import JsonResponse
# from .models import SportEvent, MusicalShowEvent, OtherFunctionEvent

# # Utility function to return JSON response for form errors
# def form_errors_to_json(form):
#     return {field: error[0] for field, error in form.errors.items()}

# # View to list Sport Events
# class SportEventListView(ListView):
#     model = SportEvent
#     template_name = 'events/sport_event_list.html'
#     context_object_name = 'sport_events'

# # View to create Sport Event with JSON response and error handling
# class SportEventCreateView(CreateView):
#     model = SportEvent
#     fields = ['sport_type', 'place', 'time', 'date', 'status']
#     template_name = 'events/sport_event_form.html'
#     success_url = reverse_lazy('sport-event-list')

#     def form_valid(self, form):
#         self.object = form.save()
#         return JsonResponse({'success': True, 'message': 'Sport event created successfully', 'event_id': self.object.id}, status=201)

#     def form_invalid(self, form):
#         return JsonResponse({'success': False, 'errors': form_errors_to_json(form)}, status=400)

# # View to list Musical Show Events
# class MusicalShowEventListView(ListView):
#     model = MusicalShowEvent
#     template_name = 'events/musical_show_event_list.html'
#     context_object_name = 'musical_show_events'

# # View to create Musical Show Event with JSON response and error handling
# class MusicalShowEventCreateView(CreateView):
#     model = MusicalShowEvent
#     fields = ['show_name', 'place', 'time', 'date', 'status']
#     template_name = 'events/musical_show_event_form.html'
#     success_url = reverse_lazy('musical-show-event-list')

#     def form_valid(self, form):
#         self.object = form.save()
#         return JsonResponse({'success': True, 'message': 'Musical show event created successfully', 'event_id': self.object.id}, status=201)

#     def form_invalid(self, form):
#         return JsonResponse({'success': False, 'errors': form_errors_to_json(form)}, status=400)

# # View to list Other Function Events
# class OtherFunctionEventListView(ListView):
#     model = OtherFunctionEvent
#     template_name = 'events/other_function_event_list.html'
#     context_object_name = 'other_function_events'

# # View to create Other Function Event with JSON response and error handling
# class OtherFunctionEventCreateView(CreateView):
#     model = OtherFunctionEvent
#     fields = ['function_name', 'place', 'time', 'date', 'status']
#     template_name = 'events/other_function_event_form.html'
#     success_url = reverse_lazy('other-function-event-list')

#     def form_valid(self, form):
#         self.object = form.save()
#         return JsonResponse({'success': True, 'message': 'Other function event created successfully', 'event_id': self.object.id}, status=201)

#     def form_invalid(self, form):
#         return JsonResponse({'success': False, 'errors': form_errors_to_json(form)}, status=400)

from rest_framework import generics, status
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent
from .serializers import EventSerializer, SportEventSerializer, MusicalShowEventSerializer, OtherFunctionEventSerializer

# Helper function for consistent JSON responses
def create_json_response(message, data=None, status_code=status.HTTP_200_OK):
    return JsonResponse({
        "status": "success" if status_code == status.HTTP_200_OK else "error",
        "message": message,
        "data": data
    }, status=status_code)

class AddEventView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    def post(self, request, *args, **kwargs):
        event_type = request.data.get('event_type')
        if not event_type:
            return create_json_response("Event type is required", status_code=status.HTTP_400_BAD_REQUEST)

        if event_type == 'sports':
            serializer = SportEventSerializer(data=request.data)
        elif event_type == 'musical_show':
            serializer = MusicalShowEventSerializer(data=request.data)
        elif event_type == 'other_function':
            serializer = OtherFunctionEventSerializer(data=request.data)
        else:
            return create_json_response("Invalid event type", status_code=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            event = serializer.save()
            return create_json_response(f"{event_type.capitalize()} Event Added Successfully", serializer.data, status.HTTP_201_CREATED)
        else:
            return create_json_response("Validation Error", serializer.errors, status.HTTP_400_BAD_REQUEST)

# Add Sport Event with error handling
class AddSportEventView(generics.CreateAPIView):
    queryset = SportEvent.objects.all()
    serializer_class = SportEventSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return create_json_response("Sport Event Added Successfully", serializer.data, status.HTTP_201_CREATED)
        else:
            return create_json_response("Validation Error", serializer.errors, status.HTTP_400_BAD_REQUEST)

# Add Musical Show Event with error handling
class AddMusicalShowEventView(generics.CreateAPIView):
    queryset = MusicalShowEvent.objects.all()
    serializer_class = MusicalShowEventSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return create_json_response("Musical Show Event Added Successfully", serializer.data, status.HTTP_201_CREATED)
        else:
            return create_json_response("Validation Error", serializer.errors, status.HTTP_400_BAD_REQUEST)

# Add Other Function Event with error handling
class AddOtherFunctionEventView(generics.CreateAPIView):
    queryset = OtherFunctionEvent.objects.all()
    serializer_class = OtherFunctionEventSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return create_json_response("Other Function Event Added Successfully", serializer.data, status.HTTP_201_CREATED)
        else:
            return create_json_response("Validation Error", serializer.errors, status.HTTP_400_BAD_REQUEST)

# Generic Event List and Detail Views with error handling
class EventListView(generics.ListAPIView):
    def get_queryset(self):
        event_type = self.kwargs['event_type']
        try:
            if event_type == 'sports':
                return SportEvent.objects.all()
            elif event_type == 'musical_shows':
                return MusicalShowEvent.objects.all()
            elif event_type == 'other_functions':
                return OtherFunctionEvent.objects.all()
            else:
                raise ValueError("Invalid event type")
        except ValueError as e:
            self.request.error = str(e)
            return []

    def get_serializer_class(self):
        event_type = self.kwargs['event_type']
        if event_type == 'sports':
            return SportEventSerializer
        elif event_type == 'musical_shows':
            return MusicalShowEventSerializer
        elif event_type == 'other_functions':
            return OtherFunctionEventSerializer

    def list(self, request, *args, **kwargs):
        if hasattr(self.request, 'error'):
            return create_json_response(self.request.error, status_code=status.HTTP_400_BAD_REQUEST)
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return create_json_response("Event List Retrieved Successfully", serializer.data)

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        event_type = self.kwargs['event_type']
        try:
            if event_type == 'sports':
                return SportEvent.objects.all()
            elif event_type == 'musical_shows':
                return MusicalShowEvent.objects.all()
            elif event_type == 'other_functions':
                return OtherFunctionEvent.objects.all()
            else:
                raise ValueError("Invalid event type")
        except ValueError as e:
            self.request.error = str(e)
            return []

    def get_serializer_class(self):
        event_type = self.kwargs['event_type']
        if event_type == 'sports':
            return SportEventSerializer
        elif event_type == 'musical_shows':
            return MusicalShowEventSerializer
        elif event_type == 'other_functions':
            return OtherFunctionEventSerializer

    def retrieve(self, request, *args, **kwargs):
        if hasattr(self.request, 'error'):
            return create_json_response(self.request.error, status_code=status.HTTP_400_BAD_REQUEST)
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return create_json_response("Event Retrieved Successfully", serializer.data)
        except ObjectDoesNotExist:
            return create_json_response("Event Not Found", status_code=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        if hasattr(self.request, 'error'):
            return create_json_response(self.request.error, status_code=status.HTTP_400_BAD_REQUEST)
        partial = kwargs.pop('partial', False)
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                self.perform_update(serializer)
                return create_json_response("Event Updated Successfully", serializer.data)
            else:
                return create_json_response("Validation Error", serializer.errors, status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return create_json_response("Event Not Found", status_code=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        if hasattr(self.request, 'error'):
            return create_json_response(self.request.error, status_code=status.HTTP_400_BAD_REQUEST)
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return create_json_response("Event Deleted Successfully", status_code=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return create_json_response("Event Not Found", status_code=status.HTTP_404_NOT_FOUND)
        
# Helper function for consistent JSON responses
def create_json_response(message, data=None, status_code=status.HTTP_200_OK):
    return JsonResponse({
        "status": "success" if status_code == status.HTTP_200_OK else "error",
        "message": message,
        "data": data
    }, status=status_code)

# Update Event View
class UpdateEventView(generics.UpdateAPIView):
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        event_type = self.kwargs['event_type']
        if event_type == 'sports':
            return SportEvent.objects.all()
        elif event_type == 'musical_shows':
            return MusicalShowEvent.objects.all()
        elif event_type == 'other_functions':
            return OtherFunctionEvent.objects.all()
        else:
            self.request.error = "Invalid event type"
            return []

    def get_serializer_class(self):
        event_type = self.kwargs['event_type']
        if event_type == 'sports':
            return SportEventSerializer
        elif event_type == 'musical_shows':
            return MusicalShowEventSerializer
        elif event_type == 'other_functions':
            return OtherFunctionEventSerializer

    def update(self, request, *args, **kwargs):
        if hasattr(self.request, 'error'):
            return create_json_response(self.request.error, status_code=status.HTTP_400_BAD_REQUEST)
        partial = kwargs.pop('partial', False)
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                self.perform_update(serializer)
                return create_json_response("Event Updated Successfully", serializer.data)
            else:
                return create_json_response("Validation Error", serializer.errors, status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return create_json_response("Event Not Found", status_code=status.HTTP_404_NOT_FOUND)

# Delete Event View
class DeleteEventView(generics.DestroyAPIView):
    lookup_url_kwarg = 'pk'

    def get_queryset(self):
        event_type = self.kwargs['event_type']
        if event_type == 'sports':
            return SportEvent.objects.all()
        elif event_type == 'musical_shows':
            return MusicalShowEvent.objects.all()
        elif event_type == 'other_functions':
            return OtherFunctionEvent.objects.all()
        else:
            self.request.error = "Invalid event type"
            return []

    def destroy(self, request, *args, **kwargs):
        if hasattr(self.request, 'error'):
            return create_json_response(self.request.error, status_code=status.HTTP_400_BAD_REQUEST)
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return create_json_response("Event Deleted Successfully", status_code=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return create_json_response("Event Not Found", status_code=status.HTTP_404_NOT_FOUND)