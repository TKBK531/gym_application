from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse
from rest_framework import views, generics, status

from .models import Court, CourtRate, Reservation
from .serializers import CourtSerializer, CourtRateSerializer, ReservationSerializer


# Create your views here.
class CourtViewSet(viewsets.ModelViewSet):
    queryset = Court.objects.all()
    serializer_class = CourtSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        resp = {
            "status": "success",
            "message": "List of courts retrieved successfully",
            "data": serializer.data,
        }
        return JsonResponse(resp, status=200)


class CourtRateView(viewsets.ModelViewSet):
    queryset = CourtRate.objects.all()
    serializer_class = CourtRateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            response_data = {
                "status": "success",
                "message": "Court rate created successfully",
                "data": response.data,
            }
        except ValidationError as e:
            error_message = (
                list(e.detail.values())[0][0] if e.detail else "Validation error"
            )
            response_data = {
                "status": "error",
                "message": error_message,
            }

        return JsonResponse(response_data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.copy()

        # Extract the court value from the URL and set it in the data
        court_id = self.kwargs.get("pk")
        data["court"] = court_id

        serializer = self.get_serializer(instance, data=data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            response_data = {
                "status": "success",
                "message": "Court rate updated successfully",
                "data": serializer.data,
            }
            return JsonResponse(response_data, status=status.HTTP_200_OK)
        except ValidationError as e:
            error_message = (
                list(e.detail.values())[0][0] if e.detail else "Validation error"
            )
            response_data = {
                "status": "error",
                "message": error_message,
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response_data = {
                "status": "error",
                "message": str(e),
            }
            return JsonResponse(response_data, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
            response_data = {
                "status": "success",
                "message": "Court rate deleted successfully",
            }
        except Exception as e:
            response_data = {
                "status": "error",
                "message": str(e),
            }

        return JsonResponse(response_data)

    def partial_update(self, request, *args, **kwargs):
        try:
            response = super().partial_update(request, *args, **kwargs)
            response_data = {
                "status": "success",
                "message": "Court rate updated successfully",
                "data": response.data,
            }
        except Exception as e:
            response_data = {
                "status": "error",
                "message": str(e),
            }

        return JsonResponse(response_data)


class CreateReservationView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        data["user"] = user.id
        try:
            serializer = self.get_serializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                response_data = {
                    "status": "success",
                    "message": "Reservation created successfully",
                    "data": serializer.data,
                }

        except ValidationError as e:
            response_data = {
                "status": "error",
                "message": e.detail,
            }

        except Exception as e:
            response_data = {
                "status": "error",
                "message": str(e),
            }

        return JsonResponse(response_data)
