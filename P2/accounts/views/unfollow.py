from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.serializers import UnfollowedRestaurantSerializer

class UnfollowedRestaurantView(UpdateAPIView):
    """
    Removes restaurant from user's follower list, removes user from restaurant's following list
    To create please provide:
    - Path Param - **id**: the id of the restaurant that the user wants to unfollow
    """
    serializer_class = UnfollowedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
        return restaurant