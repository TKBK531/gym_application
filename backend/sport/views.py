from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import generics
from .models import Sport
from .serializers import SportSerializer


# Create your views here.
class SportListView(generics.ListAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [AllowAny]


class AssignInCharge(generics.UpdateAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [IsAdminUser]

    def get_user(pk):
        try:
            in_charge = User.objects.get(pk=pk)

        except User.DoesNotExist:
            return None

    def perform_update(self, serializer):
        serializer.save(in_charge=self.request.user)
