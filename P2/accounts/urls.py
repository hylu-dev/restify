from django.urls import path
from accounts.views.login import LoginView
from accounts.views.logout import LogoutView
from accounts.views.register import RegisterView
from accounts.views.profile import ProfileView
from accounts.views.profileupdate import ProfileUpdateView
from accounts.views.profileall import ProfileAllView
from accounts.views.follow import FollowedRestaurantView
from accounts.views.unfollow import UnfollowedRestaurantView
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views.feed import FeedView
from accounts.views.browsing import BrowsingView
from accounts.views.browsing import NotificationView

app_name = 'accounts'

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    #path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/<int:id>/', ProfileView.as_view(), name='profile'),
    path('api/profile/edit/', ProfileUpdateView.as_view(), name='profile-update'),
    path('api/profile/all/', ProfileAllView.as_view(), name='profile-all'),
    path('api/restaurant/<int:id>/follow/', FollowedRestaurantView.as_view(), name='follow-restaurant'),
    path('api/restaurant/<int:id>/unfollow/', UnfollowedRestaurantView.as_view(), name='unfollow-restaurant'),
    path('api/feed/', FeedView.as_view(), name='feed'),
    path('api/browse/', BrowsingView.as_view(), name='browsing'),
    path('api/notifications/', NotificationView.as_view(), name='notifications')
]