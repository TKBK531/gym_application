from django.urls import path
from .views import SportListView

urlpatterns = [
    path("all-sports/", SportListView.as_view(), name="sport-list"),
]
