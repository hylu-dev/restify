from rest_framework.generics import get_object_or_404, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Post

from restaurants.serializers import PostSerializer;

class DeletePostView(DestroyAPIView):
    """
    Removes a single post from a restaurant
    The user must own the restaurant that the post belongs to, to delete it

     - Path Param - **id**: id of the post to delete
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Post, id=self.kwargs['id'], user=self.request.user)