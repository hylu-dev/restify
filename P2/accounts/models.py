from django.db import models
from django.contrib.auth.models import AbstractUser

# Imported from https://pypi.org/project/django-phone-field/
# Only works with NA phone numbers; another version works with international if needed
from phone_field import PhoneField

from django.db.models import CASCADE
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


# Omitted foreign keys in the case of creating relationship models
class User(AbstractUser):
    avatar = models.ImageField(upload_to='images', help_text='Account profile icon')
    phone_number = PhoneField(help_text='Account phone number', null=True, blank=True)
    # owned_restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE, null=True)

    def getName(self):
        return f"{self.first_name} {self.last_name}"

# Omitted foreign keys in the case of creating relationship models
class Notification(models.Model):

    class NotificationType(models.TextChoices):
        COMMENT = 'Comment'
        FOLLOW = 'Follow'
        LIKE = 'Like'
        POST = 'Post'
        UPDATE = 'Update'

    users = models.ManyToManyField(User)

    """
    GenericForeignKey to link to any of the models, since both a Restaurant or User can be a poster.

    Relating the GenericForeignKey to another model instance works like below:

    art = Article.objects.get(id=1)
    c = Comment(content_object=art, comm='asdf')
    c.save()
    """
    source_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='source')
    source_id = models.PositiveIntegerField()
    source = GenericForeignKey('source_type', 'source_id')

    target_type =   models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='target')
    target_id = models.PositiveIntegerField()
    target = GenericForeignKey('target_type', 'target_id')

    timestamp = models.DateTimeField(help_text='Time of the event occurrence')
    body = models.CharField(max_length=200, help_text='Description of the event')
    type = models.CharField(max_length=200, choices=NotificationType.choices)

    # def __str__(self):
    #     match self.type:
    #         case self.NotificationType.COMMENT:
    #             return f'{self.source.name} has commented on your {self.target.__name__}' #depends on model name
    #         case self.NotificationType.FOLLOW:
    #             return f'{self.source.name} has followed on your {self.target.__name__}'
    #         case self.NotificationType.LIKE:
    #             return f'{self.source.name} has liked your {self.target.__name__}'
    #         case self.NotificationType.POST:
    #             return f'{self.source.name} has made a new {self.target.__name__}'
    #         case self.NotificationType.UPDATE:
    #             return f'{self.source.name} has updated their {self.target.__name__}'
    #         case _:
    #             return