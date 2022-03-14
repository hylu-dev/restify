from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import User
from restaurants.models import Restaurant

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only= True)
    email = serializers.CharField(required=True, validators=[validate_email])

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'password',
            'password2',
            'username',
            'email',
            'phone_number',
            'avatar'
        ]

    def create(self, data):
        user = User.objects.create_user(
            first_name=data.get('first_name',''),
            last_name=data.get('last_name',''),
            password=data.get('password',''),
            username=data.get('username',''),
            email=data.get('email',''),
            phone_number=data.get('phone_number',''),
            avatar=data.get('avatar','')
        )
        return user

    def validate(self, data):
        errors = {}
        if User.objects.filter(username=data.get('username', '')).exists():
            errors['username'] = 'A user with that username already exists'
        if data.get('password', '') != data.get('password2', ''):
            errors['password'] = 'Passwords do not match'
        if errors:
            raise serializers.ValidationError(errors)
        return data

class LoginSerializer(TokenObtainPairSerializer):
    pass

class ProfileUpdateSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    password = serializers.CharField(required=False, validators=[validate_password])
    password2 = serializers.CharField(required=False, write_only= True)
    id = serializers.CharField(read_only= True)
    
    class Meta:
        model = User
        fields = [
            "id",
            'first_name',
            'last_name',
            'password',
            'password2',
            'email',
            'phone_number',
            'avatar'
        ]

    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        if validated_data.get('password'):
            instance.set_password(validated_data['password'])
            instance.save()
        return instance

    def validate(self, data):
        errors = {}
        if data.get('password', '') != data.get('password2', ''):
            errors['password'] = 'Passwords do not match'
        if errors:
            raise serializers.ValidationError(errors)
        return data

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'phone_number',
            'avatar'
        ]

class FollowedRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['followers']

    def update(self, instance, validated_data):
        instance.followers.add(self.context.get('request', None).user)
        instance.save()

        return instance

class UnfollowedRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['followers']

    def update(self, instance, validated_data):
        instance.followers.remove(self.context.get('request', None).user)
        instance.save()

        return instance
