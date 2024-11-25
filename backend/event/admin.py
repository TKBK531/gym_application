# from django.contrib import admin
# from django.contrib import admin
# from .models import EventCategory, Event
# from .models import EventCategory, Event

# # Register your models here.

# admin.site.register(EventCategory)
# admin.site.register(Event)

# admin.py
from django.contrib import admin
from .models import Event, SportEvent, MusicalShowEvent, OtherFunctionEvent

admin.site.register(Event)
admin.site.register(SportEvent)
admin.site.register(MusicalShowEvent)
admin.site.register(OtherFunctionEvent)
