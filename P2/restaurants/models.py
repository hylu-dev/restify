from django.db import models
# from django.db.models import CASCADE

# Create your models here.

# Omitted foreign keys in the case of creating relationship models
class FoodItem(models.Model):
    # restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True)

    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    price = models.FloatField(min=0.0)