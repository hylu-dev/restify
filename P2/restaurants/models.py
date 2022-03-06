from django.db import models
# from django.db.models import CASCADE

# Create your models here.

# Omitted foreign keys in the case of creating relationship models
class FoodItem(models.Model):
    # restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True)

    name = models.CharField(max_length=200, help_text='Name of the menu item')
    description = models.CharField(max_length=200, help_text='Description of the menu item')

    # Positive prices will be ensured by form validator
    price = models.FloatField(help_text='Price of the menu item')