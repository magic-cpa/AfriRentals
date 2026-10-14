from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/v1/auth/', include('core.auth_urls')),
]
