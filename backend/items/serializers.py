from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_id', 'item_type', 'sport']  # Include all necessary fields

    def create(self, validated_data):
        return Item.objects.create(**validated_data)       
