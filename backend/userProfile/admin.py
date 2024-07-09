from django.contrib import admin
from .models import (
    UserProfile,
    UserType,
    Province,
    City,
    AcademicStaffUser,
    PostgraduateUser,
    Faculty,
)


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


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "code",
    )
    search_fields = (
        "name",
        "code",
    )


@admin.register(AcademicStaffUser)
class AcademicStaffUserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "faculty",
        "date_of_appointment",
        "upf_number",
    )
    search_fields = (
        "user__username",
        "faculty__name",
        "upf_number",
    )


@admin.register(PostgraduateUser)
class PostgraduateUserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "pg_registration_number",
    )
    search_fields = (
        "user__username",
        "pg_registration_number",
    )
