from django.http import Http404
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from restaurants.serializers import RestaurantSerializer;

class UpdateRestaurantView(UpdateAPIView):
    """
    Update the details for a given restaurant
    User must own a restaurant
    """
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return self.request.user.owner
        except ObjectDoesNotExist:
            raise Http404