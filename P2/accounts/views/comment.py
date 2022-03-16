from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import CommentSerializer;

class CommentView(CreateAPIView):
    """
    Adds a comment to restruant with id of id
    To create please provide:
    - **id**: the id of the restaurant being commented on
    """ 
    filter_backends = (CustomFilter,)
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {"id": self.kwargs['id'], "request": self.request}