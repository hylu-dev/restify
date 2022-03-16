from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.serializers import FollowedRestaurantSerializer

class FollowedRestaurantView(UpdateAPIView):
    """
    Adds restaurant to user's follower list, adds user to restaurant's following list
    To create please provide:
    - Path Param - **id**: the id of the restaurant that the user wants to follow
    """
    serializer_class = FollowedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
        return restaurant