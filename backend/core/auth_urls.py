from django.urls import path
from .views_auth import CustomTokenObtainPairView, SignupView, LogoutView, MeView, LoginView

urlpatterns = [
    path('signup', SignupView.as_view(), name='auth-signup'),
    path('login', LoginView.as_view(), name='auth-login'),
    path('logout', LogoutView.as_view(), name='auth-logout'),
    path('me', MeView.as_view(), name='auth-me'),
]
