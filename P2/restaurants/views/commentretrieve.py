from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import CommentSerializer;
from restaurants.models import Comment, Restaurant

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class CommentRetrieveView(ListAPIView):
    """
    Returns all the comments on a restaurant

     - Path Param - **id**: id of the restaurant to retrieve comments from
    """

    serializer_class = CommentSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        # Check that the restaurant for the query exists, if not, return 404
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])

        queryset = Comment.objects.filter(restaurant__id=self.kwargs['id']).order_by('-timestamp')
        return queryset