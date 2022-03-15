from rest_framework.generics import get_object_or_404, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import ProfileSerializer;
from rest_framework.filters import BaseFilterBackend
import coreapi
import coreschema

class CustomFilter(BaseFilterBackend):
    def get_schema_fields(self, view):
        fields = [
            coreapi.Field(
                name="id",
                schema=coreschema.String(description="the id of the user who's profile we are viewing"),
                required=True,
                location='path')
        ]
        return fields

    def filter_queryset(self, request, queryset, view):
        return queryset

class ProfileView(RetrieveAPIView):
    """
    Returns the profile of a user with id of id
    """
    filter_backends = (CustomFilter,)
    serializer_class = ProfileSerializer

    def get_object(self):
        user_obj = get_object_or_404(User, id=self.kwargs['id'])
        return user_obj
