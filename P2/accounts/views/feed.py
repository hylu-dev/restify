from restaurants.models import Post, Restaurant
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from accounts.serializers import FeedSerializer

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'

class FeedView(ListAPIView):
    """
    Returns all the posts from the restaurants the user is following in reverse chronological order
    """ 
    serializer_class = FeedSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.filter(restaurant__in=Restaurant.objects.filter(followers=self.request.user)).order_by('-timestamp')
        return queryset
