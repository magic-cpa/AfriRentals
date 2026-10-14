from django.urls import path, include
from . import views
from rest_framework import routers
from .api_views import PropertyViewSet, BookingViewSet

router = routers.DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('', views.index, name='index'),
    path('api/v1/auth/', include('core.auth_urls')),
    path('api/v1/', include((router.urls, 'core'), namespace='api_v1')),
]
