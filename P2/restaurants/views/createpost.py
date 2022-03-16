from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.serializers import PostSerializer;

class CreatePostView(CreateAPIView):
    """
    Creates a post for the restaurant
    The user must not already have a restaurant
    """

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]