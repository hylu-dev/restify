from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import CommentSerializer;
from rest_framework.filters import BaseFilterBackend
import coreapi
import coreschema

class CustomFilter(BaseFilterBackend):
    def get_schema_fields(self, view):
        fields = [
            coreapi.Field(
                name="id",
                schema=coreschema.String(description='the id of the restaurant that owns the post this comment belong to'),
                required=True,
                location='path')
        ]
        return fields

    def filter_queryset(self, request, queryset, view):
        return queryset

class CommentView(CreateAPIView):
    """
    Adds a comment to restruant with id of id
    """ 
    filter_backends = (CustomFilter,)
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {"id": self.kwargs['id'], "request": self.request}