from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.serializers import RestaurantSerializer;

class UpdateRestaurantView(UpdateAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.owner