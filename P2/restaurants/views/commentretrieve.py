from rest_framework.generics import get_object_or_404, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import CommentSerializer;
from restaurants.models import Comment

class CommentRetrieveView(RetrieveAPIView):
    """
    Adds a comment to a restaraunt
    To create please provide:

    - Path Param - **id**: the id of the comment being retrieved
    """

    serializer_class = CommentSerializer

    def get_object(self):
        comment = get_object_or_404(Comment, id=self.kwargs['id'])
        return comment
