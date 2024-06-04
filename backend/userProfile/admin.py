from django.contrib import admin
from .models import UserProfile, UserType, Province, City


# Register UserProfile model
@admin.register(UserProfile)  # Using decorator for cleaner registration
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "contact", "user_type", "city")
    list_filter = ("user_type",)  # Filter by user_type
    search_fields = (
        "user__username",
        "user__email",
        "contact",
    )


@admin.register(UserType)
class UserTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
    search_fields = ("name",)


@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "label",
    )
    search_fields = ("label",)


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "province",
        "label",
    )
    search_fields = ("label",)
