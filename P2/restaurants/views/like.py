from rest_framework.generics import get_object_or_404, UpdateAPIView
from django.core.exceptions import ObjectDoesNotExist

from restaurants.models import Restaurant, LikedRestaurant

from restaurants.serializers import LikedRestaurantSerializer;

class LikeRestaurantView(UpdateAPIView):
    """
    At the click of a like button, increment the number of likes by 1 for a restaurant and create 
    a LikedRestaurant object that tracks the user information.
    """
    serializer_class = LikedRestaurantSerializer

    def get_object(self):
        try:
            likedRes = LikedRestaurant.objects.get(restaurant=Restaurant.objects.get(id=self.kwargs['id']))
            likedRes.users_who_like.add(self.request.user)
            likedRes.save()
        except ObjectDoesNotExist:
            likedRes = LikedRestaurant.objects.create(restaurant=Restaurant.objects.get(id=self.kwargs['id']))
            likedRes.users_who_like.add(self.request.user)
            likedRes.save()
        return get_object_or_404(Restaurant, id=self.kwargs['id'])