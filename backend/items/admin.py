# from django.contrib import admin
# from .models import ItemType, Item, inUse


# # Register your models here.
# @admin.register(ItemType)
# class ItemTypeAdmin(admin.ModelAdmin):
#     list_display = ("id", "label", "sport")
#     list_filter = ("sport",)


# @admin.register(Item)
# class ItemAdmin(admin.ModelAdmin):
#     list_display = ("id", "item_id", "item_type", "sport")
#     list_filter = ("sport",)


# @admin.register(inUse)
# class inUseAdmin(admin.ModelAdmin):
#     list_display = ("id", "item", "user")
#     list_filter = ("item",)

from django.contrib import admin
from .models import ItemType, Item, InUse

@admin.register(ItemType)
class ItemTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'item_type', 'count')

@admin.register(InUse)
class InUseAdmin(admin.ModelAdmin):
    list_display = ('item', 'is_in_use')
