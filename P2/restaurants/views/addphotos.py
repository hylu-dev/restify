from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import PhotoSerializer;

class AddPhotoView(CreateAPIView):
    """
    Adds a photo to gallery of the users restaurant
    User must own a restaurant
    """
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]