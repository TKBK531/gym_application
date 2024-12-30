# from django.urls import path
# from .views import ItemCreateView, ItemListView

# urlpatterns = [
#     path('add/', ItemCreateView.as_view(), name='item-add'),
#     path('all-items/', ItemListView.as_view(), name='item-list'),  # Add the URL to access the item list
# ]

# urls.py
from django.urls import path
from .views import EquipmentListView, EquipmentCreateView, EquipmentUpdateView, EquipmentDeleteView

urlpatterns = [
    path('equipment/', EquipmentListView.as_view(), name='equipment-list'),
    path('equipment/add/', EquipmentCreateView.as_view(), name='equipment-add'),
    path('equipment/update/<int:pk>/', EquipmentUpdateView.as_view(), name='equipment-update'),
    path('equipment/delete/<int:pk>/', EquipmentDeleteView.as_view(), name='equipment-delete'),
]


