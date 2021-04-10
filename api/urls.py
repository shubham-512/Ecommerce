from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.getRoutes, name="home"),
    path('api/products/', views.getProducts, name="products"),
    path('api/users/profile/', views.getUserProfile, name="user-profile"),
    path('api/product/<str:id>/', views.getProduct, name="product"),
    path('api/add/order/', views.addOrderitem, name="add-order"),
    path('api/users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/registeruser/', views.registerUser, name="register-user"),
    path('api/users/', views.getUsers, name="user-profile"),
    
    
]