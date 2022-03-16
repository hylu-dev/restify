from django.http import Http404
from rest_framework.generics import get_object_or_404, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

from restaurants.models import FoodItem

from restaurants.serializers import FoodItemSerializer

class UpdateFoodItemView(UpdateAPIView):
    """
    Update the details for a given food item
    User must own the restaurant that the food item belongs in the menu of

     - Path Param - **id**: id of the food item to update
    """

    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return get_object_or_404(FoodItem, restaurant=self.request.user.owner, id=self.kwargs['id'])
        except ObjectDoesNotExist:
            raise Http404
