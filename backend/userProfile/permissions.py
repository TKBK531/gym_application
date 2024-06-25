from rest_framework import permissions

from .models import UserProfile


class IsAdminUserType(permissions.BasePermission):
    def has_permission(self, request, view):
        # Assuming 'admin' is the name of the admin user type
        user_profile = UserProfile.objects.get(user=request.user)
        return request.user.is_authenticated and user_profile.user_type.name == "admin"
