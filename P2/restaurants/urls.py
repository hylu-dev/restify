from django.urls import path

from restaurants.views.restaurant import RestaurantView
from restaurants.views.updaterestaurant import UpdateRestaurantView
from restaurants.views.like import LikeRestaurantView

app_name = 'restaurants'

urlpatterns = [
    path('api/restaurant/<int:id>/details/', RestaurantView.as_view(), name='view-restaurant'),
    path('api/restaurant/<int:id>/edit/', UpdateRestaurantView.as_view(), name='edit-restaurant'),
    path('api/restaurant/<int:id>/like/', LikeRestaurantView.as_view(), name='edit-restaurant'),
]