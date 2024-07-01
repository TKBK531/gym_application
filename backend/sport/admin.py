from django.contrib import admin
from .models import Sport, Post, Team, TeamMember, Subscription


# Register your models here.
@admin.register(Sport)
class SportAdmin(admin.ModelAdmin):
    list_display = ("id", "label")
    search_fields = ("label",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "sport")
    list_filter = ("sport",)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "sport")
    list_filter = ("sport",)


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("id", "team", "user")
    list_filter = ("team",)


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "sport")
    list_filter = ("sport",)
