from django.contrib import admin

# Register your models here.
from accounts.models import User, Notification
from restaurants.models import FoodItem

admin.site.register(User)
admin.site.register(Notification)
admin.site.register(FoodItem)