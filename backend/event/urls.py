from django.urls import path
from .views import CreateEventView, ListAllEventsView

urlpatterns = [
    path("create-event/", CreateEventView.as_view(), name="create-event"),
    path("list-events/", ListAllEventsView.as_view(), name="list-events"),
]
