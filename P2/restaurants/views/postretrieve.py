from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import PostRetrieveSerializer;
from restaurants.models import Post, Restaurant

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class PostRetrieveView(ListAPIView):
    """
    Returns all the posts from a restaurant

     - Path Param - **id**: id of the restaurant to retrieve posts from
    """

    serializer_class = PostRetrieveSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        # Check that the restaurant for the query exists, if not, return 404
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])

        queryset = Post.objects.filter(restaurant__id=self.kwargs['id']).order_by('-timestamp')
        return queryset