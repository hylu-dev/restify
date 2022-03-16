from restaurants.models import Photo, Restaurant
from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from restaurants.serializers import GallerySerializer

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class GalleryView(ListAPIView):
    serializer_class = GallerySerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        # Check that the restaurant for the query exists, if not, return 404
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])

        queryset = Photo.objects.filter(restaurant__id=self.kwargs['id']).order_by('-timestamp')
        return queryset
