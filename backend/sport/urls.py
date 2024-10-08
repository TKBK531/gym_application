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
]
