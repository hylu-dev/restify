from django.urls import path
from restaurants.views.restaurant import RestaurantView

app_name = 'restaurants'

urlpatterns = [
    path('api/restaurant/<int:id>/details/', RestaurantView.as_view(), name='view-restaurant'),
]