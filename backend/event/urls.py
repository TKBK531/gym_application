from django.urls import path
from .views import CreateEventView

urlpatterns = [
    path("create-event/", CreateEventView.as_view(), name="create-event"),
]
