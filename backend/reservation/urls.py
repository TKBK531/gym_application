from django.urls import path
from .views import CourtViewSet, CourtRateView

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
]
