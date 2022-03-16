from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant, LikedRestaurant, LikedPost, Post

from restaurants.serializers import UnlikedRestaurantSerializer, UnlikedPostSerializer;

class UnlikeRestaurantView(UpdateAPIView):
    """
    At the click of a like button, decrement the number of likes by 1 for a restaurant and remove 
    the user from a LikedRestaurant object that tracks the user information.

    Assume that a user cannot unlike a restaurant without previously liking it.
    """

    serializer_class = UnlikedRestaurantSerializer
    permission_classes = [IsAuthenticated]


    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['tetst'])

        # Under the assumption that the restaurant was previously liked, the LikedRestaurant object should exist
        likedRes = LikedRestaurant.objects.get(restaurant=restaurant.id)
        likedRes.users_who_like.remove(self.request.user)
        likedRes.save()

        return restaurant

class UnlikePostView(UpdateAPIView):
    """
    At the click of a like button, decrement the number of likes by 1 for a post and remove 
    the user from a LikedPost object that tracks the user information.

    Assume that a user cannot unlike a post without previously liking it.
    """

    serializer_class = UnlikedPostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post = get_object_or_404(Post, id=self.kwargs['id'])

        # Under the assumption that the post was previously liked, the LikedPost object should exist
        likedPost = LikedPost.objects.get(post=post)
        likedPost.users_who_like.remove(self.request.user)
        likedPost.save()

        return post