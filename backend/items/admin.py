from django.contrib import admin
from .models import Equipment,ItemType, Item, InUse

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('item', 'sport', 'count')
    search_fields = ('item',)
    list_filter = ('sport',)
    ordering = ('item',)

@admin.register(ItemType)
class ItemTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'item_type', 'count')
    search_fields = ('name', 'item_type__name')
    list_filter = ('item_type',)
    ordering = ('name',)

@admin.register(InUse)
class InUseAdmin(admin.ModelAdmin):
    list_display = ('item', 'is_in_use')
    search_fields = ('item__name',)
    list_filter = ('is_in_use',)
