from django.urls import path
from .views_auth import CustomTokenObtainPairView, SignupView, LogoutView, MeView

urlpatterns = [
    path('signup', SignupView.as_view(), name='auth-signup'),
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout', LogoutView.as_view(), name='auth-logout'),
    path('me', MeView.as_view(), name='auth-me'),
]
