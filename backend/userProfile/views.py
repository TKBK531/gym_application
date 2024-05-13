from rest_framework import generics
from .serializers import UserProfileSerializer
from .models import UserProfile
from rest_framework.permissions import AllowAny

# Create your views here.


class UserCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]
