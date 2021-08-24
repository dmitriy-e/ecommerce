from django.urls import path
from . import views
from .views import MyTokenObtainPairView, get_user_profile, get_users, register_user

urlpatterns = [
    path('users/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register', register_user, name='register'),
    path('users/profile', get_user_profile, name='user-profile'),
    path('users/', get_users, name='users'),

    path('products/', views.get_products, name='products'),
    path('products/<str:pk>', views.get_product, name='product'),
]
