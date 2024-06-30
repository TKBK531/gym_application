from django.urls import path
from .views import SportListView, UpdateInChargeView, AddSportView

urlpatterns = [
    path("all-sports/", SportListView.as_view(), name="sport-list"),
    path(
        "<int:pk>/assign-in-charge/",
        UpdateInChargeView.as_view(),
        name="assign-in-charge",
    ),
    path("add-sport/", AddSportView.as_view(), name="add-sport"),
]
