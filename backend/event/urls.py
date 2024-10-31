# from django.urls import path
# from .views import (
#     EventCategoryList, CreateCategory, UpdateCategory, DeleteCategory, 
#     EventListByCategory, AddSportEvent, AddMusicalShowEvent, AddOtherFunctionEvent
# )

# urlpatterns = [
#     path('categories/', EventCategoryList.as_view(), name='category-list'),
#     path('categories/create/', CreateCategory.as_view(), name='create-category'),
#     path('categories/<int:pk>/update/', UpdateCategory.as_view(), name='update-category'),
#     path('categories/<int:pk>/delete/', DeleteCategory.as_view(), name='delete-category'),
#     path('categories/<int:category_id>/events/', EventListByCategory.as_view(), name='events-by-category'),
#     path('sport/', AddSportEvent.as_view(), name='add-sport-event'),
#     path('musical/', AddMusicalShowEvent.as_view(), name='add-musical-show-event'),
#     path('other/', AddOtherFunctionEvent.as_view(), name='add-other-function-event'),
# ]

from django.urls import path
from .views import EventCreateAPIView, EventDetailAPIView, EventListAPIView

urlpatterns = [
    path('create/', EventCreateAPIView.as_view(), name='event-create'),
    path('eventList/', EventListAPIView.as_view(), name='event-list'),
    path('singleEvent/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
]

