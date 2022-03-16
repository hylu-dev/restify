from restaurants.models import FoodItem
from rest_framework.pagination import PageNumberPagination
from restaurants.serializers import FoodItemSerializer;
from rest_framework.generics import  ListAPIView

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class MenuView(ListAPIView):
    """
    Returns menu for a given restaurant

     - Path Param - **id**: id of the restaurant to get menu from
    """ 
    serializer_class = FoodItemSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        queryset = FoodItem.objects.filter(restaurant__id=self.kwargs['id'])
        return queryset