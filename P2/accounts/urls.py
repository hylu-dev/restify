from django.urls import path
from accounts.views.login import LoginView
from accounts.views.logout import LogoutView
from accounts.views.register import RegisterView
from accounts.views.profile import ProfileView
from accounts.views.profileupdate import ProfileUpdateView
from accounts.views.profileall import ProfileAllView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'accounts'

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    #path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='login-refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/<int:id>/', ProfileView.as_view(), name='profile'),
    path('api/profile/edit/', ProfileUpdateView.as_view(), name='profile-update'),
    path('api/profile/all/', ProfileAllView.as_view(), name='profile-all')
]