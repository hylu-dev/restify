from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import CommentSerializer;

class CommentCreateView(CreateAPIView):
    """
    Adds a comment to a restaraunt
    To create please provide:

    - Path Param - **id**: the id of the restaurant being commented on
    """ 
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {"id": self.kwargs['id'], "request": self.request}