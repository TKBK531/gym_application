from django.urls import path
from .views import ItemCreateView, ItemListView

urlpatterns = [
    path('add/', ItemCreateView.as_view(), name='item-add'),
    path('all-items/', ItemListView.as_view(), name='item-list'),  # Add the URL to access the item list
]


