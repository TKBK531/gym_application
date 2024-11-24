# # from rest_framework import serializers
# # from .models import EventCategory, Event

# # class EventCategorySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = EventCategory
# #         fields = ['id', 'name', 'description', 'image']

# # class EventSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Event
# #         fields = ['id', 'category', 'name', 'description', 'date']

# from rest_framework import serializers
# from .models import Event

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = ['id', 'category', 'name', 'description', 'date']

# serializers.py
from asyncio import Event
from rest_framework import serializers
from .models import SportEvent, MusicalShowEvent, OtherFunctionEvent

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class SportEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportEvent
        fields = '__all__'

class MusicalShowEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicalShowEvent
        fields = '__all__'

class OtherFunctionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherFunctionEvent
        fields = '__all__'
