from django.urls import path
from accounts.views.login import LoginView
from accounts.views.logout import LogoutView
from accounts.views.register import RegisterView
from accounts.views.profile import ProfileView
from accounts.views.profileupdate import ProfileUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'accounts'

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/<int:id>/', ProfileView.as_view(), name='profile'),
    path('api/profile/edit/', ProfileUpdateView.as_view(), name='profile-update')
]