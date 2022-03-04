from django.db import models
# from django.db.models import CASCADE
# from django.contrib.contenttypes.fields import GenericForeignKey
# from django.contrib.contenttypes.models import ContentType


# Omitted foreign keys in the case of creating relationship models
class Notification(models.Model):
    # user = models.ForeignKey(to=User, on_delete=CASCADE, null=True)

    """
    GenericForeignKey to link to any of the models, since both a Restaurant or User can be a poster.

    Relating the GenericForeignKey to another model instance works like below:

    art = Article.objects.get(id=1)
    c = Comment(content_object=art, comm='asdf')
    c.save()
    """
    # content_type =   models.ForeignKey(ContentType)
	# object_id = models.PositiveIntegerField()
	# poster = GenericForeignKey('content_type', 'object_id')

    timestamp = models.DateTimeField()
    body = models.CharField(max_length=200)
    type = models.CharField(max_length=200)