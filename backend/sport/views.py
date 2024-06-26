from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework import generics
from .models import Sport
from .serializers import SportSerializer
from django.http import JsonResponse


# Create your views here.
class SportListView(generics.ListAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [AllowAny]


class UpdateInChargeView(generics.UpdateAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [IsAuthenticated]

    def get_user(user_id):
        try:
            in_charge = User.objects.get(id=user_id)
            if in_charge.groups.filter(name="staff").exists():
                return in_charge
            else:
                raise ValidationError("User is not a staff member")
        except User.DoesNotExist:
            return None

    def perform_update(self, serializer):
        if self.request.user.groups.filter(name="admin").exists():
            user = self.get_user(self.request.data.get("in_charge"))
            in_charge = self.get_user(user)
            serializer.save(in_charge=in_charge)
            resp_data = {
                "status": "success",
                "message": "In charge updated successfully",
            }
        else:
            resp_data = {
                "status": "error",
                "message": "You are not authorized to perform this action",
            }

        return JsonResponse(resp_data)
