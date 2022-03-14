from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from restaurants.models import Restaurant, LikedRestaurant, LikedPost, Post

from restaurants.serializers import LikedRestaurantSerializer, LikedPostSerializer;

class LikeRestaurantView(UpdateAPIView):
    """
    At the click of a like button, increment the number of likes by 1 for a restaurant and create 
    a LikedRestaurant object that tracks the user information.
    """
    serializer_class = LikedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
        try:
            likedRes = LikedRestaurant.objects.get(restaurant=restaurant.id)
            likedRes.users_who_like.add(self.request.user)
            likedRes.save()
        except ObjectDoesNotExist:
            likedRes = LikedRestaurant.objects.create(restaurant=restaurant.id)
            likedRes.users_who_like.add(self.request.user)
            likedRes.save()
        return restaurant

class LikePostView(UpdateAPIView):
    """
    At the click of a like button, increment the number of likes by 1 for a post and create 
    a LikedPost object that tracks the user information.
    """
    serializer_class = LikedPostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post = get_object_or_404(Post, id=self.kwargs['id'])
        try:
            likedPost = LikedPost.objects.get(post=post)
            likedPost.users_who_like.add(self.request.user)
            likedPost.save()
        except ObjectDoesNotExist:
            likedPost = LikedPost.objects.create(post=post)
            likedPost.users_who_like.add(self.request.user)
            likedPost.save()
        return post