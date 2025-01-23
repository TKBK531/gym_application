from rest_framework import serializers
from .models import Item , Equipment
from sport.models import Sport

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'