# urls.py
from django.urls import path
from .views import EquipmentListView, EquipmentCreateView, EquipmentUpdateView, EquipmentDeleteView, EquipmentIncreaseCountView, EquipmentDecreaseCountView

urlpatterns = [
    path('equipment/', EquipmentListView.as_view(), name='equipment-list'),
    path('equipment/add/', EquipmentCreateView.as_view(), name='equipment-add'),
    path('equipment/update/<int:pk>/', EquipmentUpdateView.as_view(), name='equipment-update'),
    path('equipment/delete/<int:pk>/', EquipmentDeleteView.as_view(), name='equipment-delete'),
    path('equipment/<int:pk>/increase/', EquipmentIncreaseCountView.as_view(), name='equipment-increase'),
    path('equipment/<int:pk>/decrease/', EquipmentDecreaseCountView.as_view(), name='equipment-decrease'),
]


