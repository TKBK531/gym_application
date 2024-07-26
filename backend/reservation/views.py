from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse

from .models import Court, CourtRate
from .serializers import CourtSerializer, CourtRateSerializer


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
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Court rate created successfully",
            "data": response.data,
        }
        return JsonResponse(response.data, status=response.status_code)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Court rate updated successfully",
            "data": response.data,
        }
        return JsonResponse(response.data, status=response.status_code)

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return JsonResponse(
            {
                "status": "success",
                "message": "Court rate deleted successfully",
            },
            status=response.status_code,
        )

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Court rate partially updated successfully",
            "data": response.data,
        }
        return JsonResponse(response.data, status=response.status_code)
