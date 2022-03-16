from rest_framework.generics import get_object_or_404, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Photo

from restaurants.serializers import PhotoSerializer;

class DeletePhotoView(DestroyAPIView):
    """"
    Removes a single photo from a restaurants gallery
    The user must own the restaurant that the photo belongs to, to delete it

     - Path Param - **id**: id of the photo to delete
    """
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Photo, id=self.kwargs['id'], restaurant=self.request.user.owner)