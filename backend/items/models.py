# models.py
from django.db import models

class Equipment(models.Model):
    item = models.CharField(max_length=100)
    sport = models.IntegerField()
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.item


class ItemType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=100)
    item_type = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class InUse(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    is_in_use = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.item.name} - {'In Use' if self.is_in_use else 'Not In Use'}"

