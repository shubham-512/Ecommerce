from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from .models import Product,Order,OrderItem,ShippingAdress
from .serializer import  ProductSerializer, OrderSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
 

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes =[
        '/api/',
        '/api/products/',
        '/api/products/<id>',
        'api/users/profile/',
        'api/users/login',
        'api/add/order/',
    ]
    return Response(routes)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializer = UserSerializer(user , many=False)
    return  Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    products= Product.objects.all()
    serializer = ProductSerializer(products , many=True)
    return  Response(serializer.data)

@api_view(['GET'])
def getProduct(request, id):
    product = Product.objects.get(_id = id)
    serializer = ProductSerializer(product , many=False)
    return  Response(serializer.data)

@api_view(['POST'])
def addOrderitem(request):
    user= request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0 :
        return Response({'Detail':'NO order items'},status=status.HTTP_400_BAD_REQUEST)
    else : 
        # create order
        order = Order.objects.create(
          # user= user,
           paymentMethod=data['paymentMethod'],
           taxPrice=data['taxPrice'],
           shippingPrice=data['shippingPrice'],
           totalPrice=data['totalPrice'], 
        )
    
    serializer = OrderSerializer(order , many=False)
    return  Response(serializer.data)
