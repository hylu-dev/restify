from rest_framework.generics import get_object_or_404, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Comment

from restaurants.serializers import CommentSerializer;

class DeleteCommentView(DestroyAPIView):
    """
    Removes a single post from a restaurant
    The user must own the restaurant that the post belongs to, to delete it

     - Path Param - **id**: id of the post to delete
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Comment, id=self.kwargs['id'], user=self.request.user)