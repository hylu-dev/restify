from email.policy import default
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from phone_field import PhoneField
from accounts.models import User

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='restaurant_logos/', null=True, blank=True)
    postal_code = models.CharField(max_length=7)
    phone_number = PhoneField(help_text='Account phone number', null=True, blank=True)
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='owner')
    followers = models.ManyToManyField(User, related_name='followers', blank=True,)
    likes = models.IntegerField(default=0)


    def getName(self):
        return f"{self.name}"

class Photo(models.Model):
    image = models.ImageField(upload_to='images', help_text='Photo for gallery')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='photos')

class Post(models.Model):
    timestamp = models.DateTimeField()
    body = models.TextField(null=True, blank=True)
    likes = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def getName(self):
        return f"Post {self.id} of {self.restaurant}"

class LikedEntity(models.Model):
    users_who_like = models.ManyToManyField(User)
    class Meta:
        abstract = True

class LikedRestaurant(LikedEntity):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def getName(self):
        return f"Liked {self.restaurant}"

class LikedPost(LikedEntity):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def getName(self):
        return f"Liked {self.post}"

class Comment(models.Model):
    timestamp = models.DateTimeField()
    body = models.TextField(null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

# Omitted foreign keys in the case of creating relationship models
class FoodItem(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, help_text='Name of the menu item')
    description = models.CharField(max_length=200, help_text='Description of the menu item')
    price = models.FloatField(MinValueValidator(0.0), help_text='Price of the menu item')