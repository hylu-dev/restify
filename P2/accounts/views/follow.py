from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.serializers import FollowedRestaurantSerializer
from rest_framework.filters import BaseFilterBackend
import coreapi
import coreschema

class CustomFilter(BaseFilterBackend):
    def get_schema_fields(self, view):
        fields = [
            coreapi.Field(
                name="id",
                schema=coreschema.String(description='the id of the restaurant that the user wants to follow'),
                required=True,
                location='path')
        ]
        return fields

    def filter_queryset(self, request, queryset, view):
        return queryset

class FollowedRestaurantView(UpdateAPIView):
    """
    Adds restaurant to user's follower list, adds user to restaurant's following list
    """
    filter_backends = (CustomFilter,)
    serializer_class = FollowedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
        return restaurant