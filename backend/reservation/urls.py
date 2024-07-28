from django.urls import path
from .views import (
    CourtViewSet,
    CourtRateView,
    CreateReservationView,
    GetAllReservationsView,
    UpdateReservationView,
    DeleteReservationView,
)

urlpatterns = [
    path("courts/", CourtViewSet.as_view({"get": "list"}), name="courts"),
    path(
        "court-rate/",
        CourtRateView.as_view({"post": "create"}),
        name="court-rate",
    ),
    path(
        "court-rate/<int:pk>/",
        CourtRateView.as_view({"put": "update", "delete": "destroy"}),
        name="court-rate-update-delete",
    ),
    path(
        "add-reservation/",
        CreateReservationView.as_view(),
        name="create-reservation",
    ),
    path(
        "get-all-reservations/",
        GetAllReservationsView.as_view(),
        name="get-all-reservations",
    ),
    path(
        "<int:pk>/update/",
        UpdateReservationView.as_view(),
        name="update-reservation",
    ),
    path(
        "<int:pk>/delete/",
        DeleteReservationView.as_view(),
        name="delete-reservation",
    ),
]
