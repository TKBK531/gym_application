from rest_framework import serializers
<<<<<<< HEAD
from .models import Item, Equipment
=======
from .models import Item , Equipment
>>>>>>> ab26698 (Update the endpoints)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            "item_id",
            "item_type",
            "sport",
            "count",
        ]  # Include all necessary fields

    def create(self, validated_data):
        return Item.objects.create(**validated_data)


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = "__all__"
