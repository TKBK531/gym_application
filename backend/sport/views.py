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

    def get_user(self, user_id):
        try:
            in_charge = User.objects.get(id=user_id)
            if in_charge.groups.filter(name="staff").exists():
                return in_charge
            else:
                raise ValidationError("User is not a staff member")
        except User.DoesNotExist:
            return None

    def get_sport(self, sport_id):
        try:
            sport = Sport.objects.get(id=sport_id)
            return sport
        except Sport.DoesNotExist:
            return None

    def update(self, request, *args, **kwargs):
        if request.user.groups.filter(name="admin").exists():
            user_id = request.data.get("in_charge")
            if not user_id:
                return JsonResponse(
                    {"status": "error", "message": "In charge user ID is required"},
                    status=400,
                )

            try:
                in_charge = self.get_user(user_id)
            except ValidationError as e:
                return JsonResponse({"status": "error", "message": str(e)}, status=400)

            sport_id = kwargs.get("pk")
            try:
                sport = self.get_sport(sport_id)
            except ValidationError as e:
                return JsonResponse({"status": "error", "message": str(e)}, status=400)

            sport.in_charge = in_charge
            sport.save()

            sport_data = {
                "name": sport.label,
                "in_charge": sport.in_charge.get_full_name(),
            }

            resp_data = {
                "status": "success",
                "data": sport_data,
                "message": "In charge updated successfully",
            }
            return JsonResponse(resp_data)
        else:
            resp_data = {
                "status": "error",
                "message": "You are not authorized to perform this action",
            }
            return JsonResponse(resp_data, status=403)
