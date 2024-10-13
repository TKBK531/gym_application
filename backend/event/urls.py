from django.urls import path
from .views import (
    EventCategoryList, EventListByCategory,
    AddSportEvent, AddMusicalShowEvent, AddOtherFunctionEvent
)

urlpatterns = [
    path('categories/', EventCategoryList.as_view(), name='category-list'),
    path('events/<int:category_id>/', EventListByCategory.as_view(), name='event-list-by-category'),
    path('add/sport/', AddSportEvent.as_view(), name='add-sport-event'),
    path('add/musical-show/', AddMusicalShowEvent.as_view(), name='add-musical-show-event'),
    path('add/other-function/', AddOtherFunctionEvent.as_view(), name='add-other-function-event'),
]
