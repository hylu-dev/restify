from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist, BadRequest

from restaurants.models import Restaurant, LikedRestaurant, LikedPost, Post
from accounts.models import Notification

from restaurants.serializers import LikedRestaurantSerializer, LikedPostSerializer;

class LikeRestaurantView(UpdateAPIView):
    """
    At the click of a like button, increment the number of likes by 1 for a restaurant and create 
    a LikedRestaurant object that tracks the user information.

     - Path Param - **id**: id of the restaurant to like
    """
    serializer_class = LikedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
            
        # Ensure that a restaurant owner cannot like their own restaurant to inflate popularity
        if restaurant.owner.id == self.request.user.id:
            raise BadRequest
        else:
            """
            Check that the LikedRestaurant entity exists:
            
            If it does exist, add the current user to the users_who_like attribute to track who
            liked the restaurant.

            If it does not exist, create a new LikedRestaurant instance and add the current user to it.
            """
            try:
                likedRes = LikedRestaurant.objects.get(restaurant=restaurant)
                likedRes.users_who_like.add(self.request.user)
                likedRes.save()
            except ObjectDoesNotExist:
                likedRes = LikedRestaurant.objects.create(restaurant=restaurant)
                likedRes.users_who_like.add(self.request.user)
                likedRes.save()

            # Create a new Notification object to notify the owner of the restaurant that it was liked
            notification = Notification.objects.create(
                source=self.request.user,

                target=restaurant,

                body=" has liked your post",
                type='Like',
            )
            notification.users.add(restaurant.owner)
            
            notification.save()

        return restaurant

class LikePostView(UpdateAPIView):
    """
    At the click of a like button, increment the number of likes by 1 for a post and create 
    a LikedPost object that tracks the user information.

     - Path Param - **id**: id of the post to like
    """
    serializer_class = LikedPostSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        post = get_object_or_404(Post, id=self.kwargs['id'])

        # Ensure that a user cannot like their own post to inflate popularity
        if post.user.id == self.request.user.id:
            raise BadRequest
        else:
            """
            Check that the LikedPost entity exists:

            If it does exist, add the current user to the users_who_like attribute to track who
            liked the post.

            If it does not exist, create a new LikedPost instance and add the current user to it.
            """
            try:
                likedPost = LikedPost.objects.get(post=post)
                likedPost.users_who_like.add(self.request.user)
                likedPost.save()
            except ObjectDoesNotExist:
                likedPost = LikedPost.objects.create(post=post)
                likedPost.users_who_like.add(self.request.user)
                likedPost.save()
            
            # Create a new Notification object to notify the owner of the post that it was liked
            notification = Notification.objects.create(
                source=self.request.user,

                target=post,

                body="has liked your restaurant",
                type='Like',
            )
            notification.users.add(post.user)
            notification.save()

        return post