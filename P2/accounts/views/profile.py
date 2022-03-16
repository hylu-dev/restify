from rest_framework.generics import get_object_or_404, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import ProfileSerializer;
from accounts.models import User

class ProfileView(RetrieveAPIView):
    """
    Returns the profile of a user with id of id
    To create please provide:
    - Path Param - **id**: the id of the user who's profile we are viewing
    """
    
    serializer_class = ProfileSerializer

    def get_object(self):
        user_obj = get_object_or_404(User, id=self.kwargs['id'])
        return user_obj
