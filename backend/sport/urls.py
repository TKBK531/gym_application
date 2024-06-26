from django.urls import path
from .views import (
    SportListView,
    SportDetailView,
    UpdateInChargeView,
    AddSportView,
    DeleteSportView,
)

urlpatterns = [
    path("all-sports/", SportListView.as_view(), name="sport-list"),
    path("<int:pk>/", SportDetailView.as_view(), name="sport-detail"),
    path(
        "<int:pk>/assign-in-charge/",
        UpdateInChargeView.as_view(),
        name="assign-in-charge",
    ),
    path("add-sport/", AddSportView.as_view(), name="add-sport"),
    path("delete-sport/", DeleteSportView.as_view(), name="delete-sport"),
]
