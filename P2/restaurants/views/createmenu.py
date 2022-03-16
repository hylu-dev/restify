from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.serializers import FoodItemSerializer;

class CreateFoodItemView(CreateAPIView):
    """
    Creates a new food item and adds it to the restaurant of the user
    The user must own a restaurant
    """
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticated]