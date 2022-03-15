from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import Notification
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from accounts.serializers import NotificationSerializer;

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'

class NotificationView(ListAPIView):
    """
    Returns list of notifications for a user in reverse chronological order
    """
    serializer_class = NotificationSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Notification.objects.filter(users=self.request.user).order_by('-timestamp')
        return queryset