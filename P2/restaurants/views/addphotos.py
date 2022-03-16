from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import PhotoSerializer;

class AddPhotoView(CreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]