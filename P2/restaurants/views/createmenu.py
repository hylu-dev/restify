from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.serializers import FoodItemSerializer;

class CreateFoodItemView(CreateAPIView):
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {"id": self.kwargs['id'], "request": self.request}