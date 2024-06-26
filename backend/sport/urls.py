from django.urls import path
from .views import SportListView, UpdateInChargeView

urlpatterns = [
    path("all-sports/", SportListView.as_view(), name="sport-list"),
    path("assign-in-charge/", UpdateInChargeView.as_view(), name="assign-in-charge"),
]
