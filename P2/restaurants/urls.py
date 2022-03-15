from django.urls import path

from restaurants.views.restaurant import RestaurantView
from restaurants.views.updaterestaurant import UpdateRestaurantView
from restaurants.views.like import LikeRestaurantView, LikePostView
from restaurants.views.unlike import UnlikeRestaurantView, UnlikePostView
from restaurants.views.updatemenu import UpdateFoodItemView
from restaurants.views.createpost import CreatePostView
from restaurants.views.deletepost import DeletePostView

app_name = 'restaurants'

urlpatterns = [
    path('api/restaurant/<int:id>/details/', RestaurantView.as_view(), name='view-restaurant'),
    path('api/restaurant/<int:id>/edit/', UpdateRestaurantView.as_view(), name='edit-restaurant'),
    path('api/restaurant/<int:id>/like/', LikeRestaurantView.as_view(), name='like-restaurant'),
    path('api/restaurant/post/<int:id>/like/', LikePostView.as_view(), name='like-post'),
    path('api/restaurant/<int:id>/unlike/', UnlikeRestaurantView.as_view(), name='unlike-restaurant'),
    path('api/restaurant/post/<int:id>/unlike/', UnlikePostView.as_view(), name='unlike-post'),
    path('api/restaurant/item/<int:id>/edit/', UpdateFoodItemView.as_view(), name='edit-item'),
    path('api/restaurant/<int:id>/post/', CreatePostView.as_view(), name='create-post'),
    path('api/restaurant/post/<int:id>/', DeletePostView.as_view(), name='delete-post'),
]