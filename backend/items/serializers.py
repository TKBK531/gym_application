from rest_framework import serializers
from .models import Item , Equipment


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_id', 'item_type', 'sport', 'count'] # Include all necessary fields

    def create(self, validated_data):
        return Item.objects.create(**validated_data)
    

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
