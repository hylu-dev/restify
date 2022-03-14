from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from restaurants.models import Restaurant

from accounts.serializers import UnfollowedRestaurantSerializer

class UnfollowedRestaurantView(UpdateAPIView):
    serializer_class = UnfollowedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
        return restaurant