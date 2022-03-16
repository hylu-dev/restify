from django.contrib import admin

# Register your models here.

from restaurants.models import FoodItem, LikedPost, LikedRestaurant, Restaurant, Post, Comment, Photo

admin.site.register(LikedRestaurant)
admin.site.register(LikedPost)
admin.site.register(Restaurant)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(FoodItem)
admin.site.register(Photo)
