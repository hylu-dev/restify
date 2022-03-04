from django.db import models

# Create your models here.
class LikedEntity(models.Model):
    users_who_like = models.ManyToManyField(User)
    users_who_follow = models.ManyToManyField(User)
    class Meta:
        abstract = True

class Restaurant(LikedEntity):
    name = models.CharField()
    address = models.CharField()
    logo = models.ImageField(upload_to='restaurant_logos/', null=True, blank=True)
    postal_code = models.CharField(max_length=7)
    phone_number = models.CharField(max_length=16)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)

class Post(LikedEntity):
    timestamp = models.DateTimeField()
    body = models.TextField(null=True, blank=True)
    likes = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Comment(models.Model):
    timestamp = models.DateTimeField()
    body = models.TextField(null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


