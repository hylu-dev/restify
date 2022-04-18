from django.urls import path

from restaurants.views.restaurant import RestaurantView
from restaurants.views.updaterestaurant import UpdateRestaurantView
from restaurants.views.searchrestaurant import SearchRestaurantView
from restaurants.views.createrestaurant import CreateRestaurantView
from restaurants.views.like import LikeRestaurantView, LikePostView
from restaurants.views.unlike import UnlikeRestaurantView, UnlikePostView
from restaurants.views.restaurantposts import RestaurantPostsView
from restaurants.views.commentcreate import CommentCreateView
from restaurants.views.deletecomment import DeleteCommentView
from restaurants.views.commentretrieve import CommentRetrieveView
from restaurants.views.postretrieve import PostRetrieveView

from restaurants.views.createmenu import CreateFoodItemView
from restaurants.views.updatemenu import UpdateFoodItemView
from restaurants.views.createpost import CreatePostView
from restaurants.views.deletepost import DeletePostView
from restaurants.views.addphotos import AddPhotoView
from restaurants.views.deletephoto import DeletePhotoView
from restaurants.views.gallery import GalleryView
from restaurants.views.menu import MenuView

app_name = 'restaurants'

urlpatterns = [
    path('api/restaurant/<int:id>/details/', RestaurantView.as_view(), name='view-restaurant'),
    path('api/restaurant/edit/', UpdateRestaurantView.as_view(), name='edit-restaurant'),
    path('api/restaurant/search/', SearchRestaurantView.as_view(), name='search-restaurant'),
    path('api/restaurant/create/', CreateRestaurantView.as_view(), name='create-restaurant'),

    path('api/restaurant/post/<int:id>/', RestaurantPostsView.as_view(), name='post-restaurant'),
    path('api/restaurant/<int:id>/like/', LikeRestaurantView.as_view(), name='like-restaurant'),
    path('api/restaurant/post/<int:id>/like/', LikePostView.as_view(), name='like-post'),
    path('api/restaurant/<int:id>/unlike/', UnlikeRestaurantView.as_view(), name='unlike-restaurant'),
    path('api/restaurant/post/<int:id>/unlike/', UnlikePostView.as_view(), name='unlike-post'),

    path('api/restaurant/comment/<int:id>/post/', CommentCreateView.as_view(), name='comment-post'),
    path('api/restaurant/comment/<int:id>/delete/', DeleteCommentView.as_view(), name='delete-comment'),

    path('api/restaurant/item/<int:id>/edit/', UpdateFoodItemView.as_view(), name='edit-item'),
    path('api/restaurant/item/add/', CreateFoodItemView.as_view(), name='create-item'),
    path('api/restaurant/post/', CreatePostView.as_view(), name='create-post'),
    path('api/restaurant/post/<int:id>/delete/', DeletePostView.as_view(), name='delete-post'),
    path('api/restaurant/photo/add/', AddPhotoView.as_view(), name='add-photo'),
    path('api/restaurant/photo/<int:id>/delete/', DeletePhotoView.as_view(), name='delete-photo'),
    path('api/restaurant/<int:id>/photos/', GalleryView.as_view(), name='gallery'),
    path('api/restaurant/<int:id>/menu/', MenuView.as_view(), name='menu'),
    path('api/restaurant/<int:id>/comments/', CommentRetrieveView.as_view(), name='retrieve-comments'),
    path('api/restaurant/<int:id>/posts/', PostRetrieveView.as_view(), name='retrieve-posts')
]