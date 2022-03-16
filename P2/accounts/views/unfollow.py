from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from accounts.serializers import UnfollowedRestaurantSerializer
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

class UnfollowedRestaurantView(UpdateAPIView):
    """
    Removes restaurant from user's follower list, removes user from restaurant's following list
    """
    serializer_class = UnfollowedRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['id'])
        return restaurant