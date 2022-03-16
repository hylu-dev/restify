from rest_framework.generics import get_object_or_404, RetrieveAPIView

from restaurants.models import Restaurant

from restaurants.serializers import RestaurantSerializer;

class RestaurantView(RetrieveAPIView):
    """
    Returns all details for a given restaurant

     - Path Param - **id**: id of the restaurant to get details from
    """
    
    serializer_class = RestaurantSerializer

    def get_object(self):
        return get_object_or_404(Restaurant, id=self.kwargs['id'])
