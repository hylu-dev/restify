from restaurants.models import Photo, Restaurant
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from restaurants.serializers import GallerySerializer

from rest_framework.filters import BaseFilterBackend
import coreapi
import coreschema

class CustomFilter(BaseFilterBackend):
    def get_schema_fields(self, view):
        fields = [
            coreapi.Field(
                name="id",
                schema=coreschema.String(description='the id of the restaurant to get photos from'),
                required=True,
                location='path')
        ]
        return fields

    def filter_queryset(self, request, queryset, view):
        return queryset


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class GalleryView(ListAPIView):
    """
    Given a restaurant, returns all the images in it's gallery
    """
    filter_backends = (CustomFilter,)
    serializer_class = GallerySerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        queryset = Photo.objects.filter(restaurant__id=self.kwargs['id']).order_by('-timestamp')
        return queryset
