from .views import CourtViewSet
from django.urls import path

urlpatterns = [
    path("courts/", CourtViewSet.as_view({"get": "list"}), name="courts"),
]
