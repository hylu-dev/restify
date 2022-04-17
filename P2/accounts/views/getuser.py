from rest_framework.generics import get_object_or_404, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import ProfileSerializer;
from accounts.models import User

class GetUserView(RetrieveAPIView):
    """
    Returns the current logged in user. Expects a valid JWT.
    """
    
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user

