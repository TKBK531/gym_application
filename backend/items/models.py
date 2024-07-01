from django.db import models
from sport.models import Sport
from django.contrib.auth.models import User


# Create your models here.
class ItemType(models.Model):
    label = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return self.item_id


class Item(models.Model):
    item_id = models.CharField(max_length=100)
    item_type = models.ForeignKey(
        ItemType, on_delete=models.SET_NULL, null=True, blank=True
    )
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return self.item_id


class inUse(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} is currently using {self.item.item_id}"
