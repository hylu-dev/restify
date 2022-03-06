from django.db import models
from django.contrib.auth.models import AbstractUser

# Imported from https://pypi.org/project/django-phone-field/
# Only works with NA phone numbers; another version works with international if needed
from phone_field import PhoneField

from django.db.models import CASCADE
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):
    avatar = models.ImageField(upload_to='images', help_text='Account profile icon')
    phone_number = PhoneField(help_text='Account phone number', null=True, blank=True)
    # owned_restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True)


# Omitted foreign keys in the case of creating relationship models
class Notification(models.Model):
    # user = models.ManyToManyField(User, help_text="The user that will receive this notification")

    """
    GenericForeignKey to link to any of the models, since both a Restaurant or User can be a poster.

    Relating the GenericForeignKey to another model instance works like below:

    art = Article.objects.get(id=1)
    c = Comment(content_object=art, comm='asdf')
    c.save()
    """
    # content_type = models.ForeignKey(ContentType, on_delete=CASCADE)
    # object_id = models.PositiveIntegerField()
    # poster = GenericForeignKey('content_type', 'object_id')

    posters = models.ForeignKey(to=(User or Restaurant), on_delete=CASCADE, null=True)

    timestamp = models.DateTimeField(help_text='Time of the event occurrence')
    body = models.CharField(max_length=200, help_text='Description of the event')
    type = models.CharField(max_length=200, help_text='Type of notification')