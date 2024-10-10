from django.urls import path
from .views import (
    SportListView,
    SportDetailView,
    UpdateInChargeView,
    GetInChargeSportsView,
    AddSportView,
    DeleteSportView,
    UpdateSportImageView,
    GetSportPostsView,
    CreateSportPostView,
    UpdateSportPostView,
    DeleteSportPostView,
    GetAllSportPostsView,
    CreateTeamView,
    TeamListView,
    SportTeamListView,
)

urlpatterns = [
    path("all-sports/", SportListView.as_view(), name="sport-list"),
    path("<int:pk>/", SportDetailView.as_view(), name="sport-detail"),
    path(
        "<int:pk>/assign-in-charge/",
        UpdateInChargeView.as_view(),
        name="assign-in-charge",
    ),
    path(
        "get-in-charge-sports/",
        GetInChargeSportsView.as_view(),
        name="get-in-charge-sports",
    ),
    path("add-sport/", AddSportView.as_view(), name="add-sport"),
    path("delete-sport/", DeleteSportView.as_view(), name="delete-sport"),
    path(
        "<int:pk>/update-sport-image/",
        UpdateSportImageView.as_view(),
        name="update-sport",
    ),
    path("<int:pk>/posts/", GetSportPostsView.as_view(), name="get-sport-posts"),
    path("create-post/", CreateSportPostView.as_view(), name="create-sport-post"),
    path(
        "<int:pk>/update-post/",
        UpdateSportPostView.as_view(),
        name="update-sport-post",
    ),
    path("create-team/", CreateTeamView.as_view(), name="create-team"),
    path("all-teams/", TeamListView.as_view(), name="all-teams"),
    path("<int:pk>/teams/", SportTeamListView.as_view(), name="sport-teams"),
    path(
        "<int:pk>/delete-post/",
        DeleteSportPostView.as_view(),
        name="delete-sport-post",
    ),
    path("all-posts/", GetAllSportPostsView.as_view(), name="all-sport-posts"),
]
