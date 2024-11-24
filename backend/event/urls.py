# # from django.urls import path
# # from .views import (
# #     EventCategoryList, CreateCategory, UpdateCategory, DeleteCategory, 
# #     EventListByCategory, AddSportEvent, AddMusicalShowEvent, AddOtherFunctionEvent
# # )

# # urlpatterns = [
# #     path('categories/', EventCategoryList.as_view(), name='category-list'),
# #     path('categories/create/', CreateCategory.as_view(), name='create-category'),
# #     path('categories/<int:pk>/update/', UpdateCategory.as_view(), name='update-category'),
# #     path('categories/<int:pk>/delete/', DeleteCategory.as_view(), name='delete-category'),
# #     path('categories/<int:category_id>/events/', EventListByCategory.as_view(), name='events-by-category'),
# #     path('sport/', AddSportEvent.as_view(), name='add-sport-event'),
# #     path('musical/', AddMusicalShowEvent.as_view(), name='add-musical-show-event'),
# #     path('other/', AddOtherFunctionEvent.as_view(), name='add-other-function-event'),
# # ]

# # from django.urls import path
# # from .views import EventCreateAPIView, EventDeleteAPIView, EventDetailAPIView, EventListAPIView, EventUpdateAPIView

# # urlpatterns = [
# #     path('create/', EventCreateAPIView.as_view(), name='event-create'),
# #     path('eventList/', EventListAPIView.as_view(), name='event-list'),
# #     path('singleEvent/<int:pk>/', EventDetailAPIView.as_view(), name='event-detail'),
# #     path('<int:pk>/update/', EventUpdateAPIView.as_view(), name='event-update'),
# #     path('<int:pk>/delete/', EventDeleteAPIView.as_view(), name='event-delete'),
# # ]

# # events/urls.py

# # urls.py

# from django.urls import path
# from .views import (
#     SportEventListView, SportEventCreateView,
#     MusicalShowEventListView, MusicalShowEventCreateView,
#     OtherFunctionEventListView, OtherFunctionEventCreateView,
# )

# urlpatterns = [
#     path('sports/', SportEventListView.as_view(), name='sport-event-list'),
#     path('sports/add/', SportEventCreateView.as_view(), name='add-sport-event'),
#     path('musical_shows/', MusicalShowEventListView.as_view(), name='musical-show-event-list'),
#     path('musical_shows/add/', MusicalShowEventCreateView.as_view(), name='add-musical-show-event'),
#     path('other_functions/', OtherFunctionEventListView.as_view(), name='other-function-event-list'),
#     path('other_functions/add/', OtherFunctionEventCreateView.as_view(), name='add-other-function-event'),
# ]

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Add events
    path('sport/add/', views.AddSportEventView.as_view(), name='add_sport_event'),
    path('musical_show/add/', views.AddMusicalShowEventView.as_view(), name='add_musical_show_event'),
    path('other_function/add/', views.AddOtherFunctionEventView.as_view(), name='add_other_function_event'),
    path('add-event/', views.AddEventView.as_view(), name='add-event'),
    # List and detail views
    path('<str:event_type>/', views.EventListView.as_view(), name='event_list'),
    path('<str:event_type>/<int:pk>/', views.EventDetailView.as_view(), name='event_detail'),

    # Update and delete views
    path('<str:event_type>/<int:pk>/update/', views.UpdateEventView.as_view(), name='update_event'),
    path('<str:event_type>/<int:pk>/delete/', views.DeleteEventView.as_view(), name='delete_event'),
]

