from django.urls import path
from .views import (
    CreateEventView,
    ListAllEventsView,
    ListSportEventsView,
    ListMusicalShowEventsView,
    ListOtherFunctionEventsView,
    DeleteEventView,
    UpdateEventView,
    EventsInNext30DaysView,
)

urlpatterns = [
    path("create-event/", CreateEventView.as_view(), name="create-event"),
    path("list-events/", ListAllEventsView.as_view(), name="list-events"),
    path("list-sport-events/", ListSportEventsView.as_view(), name="list-sport-events"),
    path(
        "list-musical-show-events/",
        ListMusicalShowEventsView.as_view(),
        name="list-musical-show-events",
    ),
    path(
        "list-other-function-events/",
        ListOtherFunctionEventsView.as_view(),
        name="list-other-function-events",
    ),
    path("delete-event/<int:pk>/", DeleteEventView.as_view(), name="delete-event"),
    path("update-event/<int:pk>/", UpdateEventView.as_view(), name="update-event"),
    path(
        "events-in-this-month/",
        EventsInNext30DaysView.as_view(),
        name="events-in-this-month",
    ),
]
