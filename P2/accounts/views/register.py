from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from accounts.serializers import RegisterSerializer;

class RegisterView(CreateAPIView):
    """
    Register a new user with the given information
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user
