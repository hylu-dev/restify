from django.urls import path
from accounts.views.login import LoginView
from accounts.views.logout import LogoutView
from accounts.views.register import RegisterView
from accounts.views.profile import ProfileView
from accounts.views.updateprofile import UpdateProfileView

app_name = 'accounts'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/view/', ProfileView.as_view(), name='profile'),
    path('profile/edit/', UpdateProfileView.as_view(), name='profile-update'),
]