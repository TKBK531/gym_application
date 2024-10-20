from django.urls import path
from .views import (
    EventCategoryList, EventListByCategory,
    AddSportEvent, AddMusicalShowEvent, AddOtherFunctionEvent,
    UpdateEvent, DeleteEvent, CreateCategory  # Import new view
)

urlpatterns = [
    path('categories/', EventCategoryList.as_view(), name='category-list'),
    path('categories/add/', CreateCategory.as_view(), name='create-category'),  # New endpoint
    path('events/<int:category_id>/', EventListByCategory.as_view(), name='event-list-by-category'),
    path('add/sport/', AddSportEvent.as_view(), name='add-sport-event'),
    path('add/musical-show/', AddMusicalShowEvent.as_view(), name='add-musical-show-event'),
    path('add/other-function/', AddOtherFunctionEvent.as_view(), name='add-other-function-event'),
    path('event/update/<int:pk>/', UpdateEvent.as_view(), name='update-event'),
    path('event/delete/<int:pk>/', DeleteEvent.as_view(), name='delete-event'),
]
