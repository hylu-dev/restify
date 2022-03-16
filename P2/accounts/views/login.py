from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


from accounts.serializers import LoginSerializer;

class LoginView(TokenObtainPairView):
    """
    Logs a user in after being given proper authentication
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
