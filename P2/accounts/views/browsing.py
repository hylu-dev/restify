from rest_framework.generics import ListAPIView
from restaurants.models import Restaurant
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from accounts.serializers import BrowsingSerializer;

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class BrowsingView(ListAPIView):
    """
    Returns all restaurants in order of popularity
    """ 
    serializer_class = BrowsingSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        queryset = Restaurant.objects.all().order_by('-likes')
        return queryset
