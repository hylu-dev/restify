from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import ProfileUpdateSerializer;

class ProfileUpdateView(UpdateAPIView):
    """
    Edit user's profile
    """
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user