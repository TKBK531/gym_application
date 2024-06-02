from django.contrib import admin
from .models import UserProfile, UserType


# Register UserProfile model
@admin.register(UserProfile)  # Using decorator for cleaner registration
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "contact", "user_type")
    list_filter = ("user_type",)  # Filter by user_type
    search_fields = (
        "user__username",
        "user__email",
        "contact",
    )  # Search by related user and contact


@admin.register(UserType)
class UserTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
    search_fields = ("name",)
