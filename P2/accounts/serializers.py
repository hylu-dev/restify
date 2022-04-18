from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import check_password
from django.core.validators import validate_email
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.paginator import Paginator
from django.http import Http404
from django.shortcuts import get_object_or_404

from accounts.models import User, Notification
from restaurants.models import Restaurant, Post
from restaurants.serializers import PostSerializer

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
    password2 = serializers.CharField(required=False, validators=[validate_password], write_only= True)
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
        if validated_data.get('password2'):
            instance.set_password(validated_data['password2'])
            instance.save()
        return instance

    def validate(self, data):
        errors = {}
        currentpassword = self.context.get('request', None).user.password
        if data.get('password', ''):
            if check_password(data.get('password', ''), currentpassword):
                if not data.get('password2', ''):
                    errors['password'] = 'Your new password cannot be empty'
                if data.get('password', '') == data.get('password2', ''):
                    errors['password'] = 'Your new password must be different'
            else:
                errors['password'] = 'Current password is incorrect'
        if not data.get('password', '') and data.get('password2', ''):
            errors['password'] = 'You must enter your current password to set a new one'
        
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
            'avatar',
            'owner'
        ]

class FollowedRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['followers', 'likers']

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

class FeedSerializer(serializers.ModelSerializer):
    # https://medium.com/dreidev/nested-pagination-md-6414a85b5501
    # comments = serializers.SerializerMethodField('paginated_comments')

    class Meta:
        model = Post
        fields = [
                'id',
                'timestamp',
                'body',
                'likes',
                'user',
                'restaurant'
                ]

    # def paginated_comments(self, obj):
    #     page_size = self.context['request'].query_params.get('size') or 10
    #     paginator = Paginator(obj.post.all(), page_size)
    #     page_number = self.context['request'].query_params.get('batch') or 1

    #     total_results = (len(obj.post.all()))
    #     if total_results - int(page_size)*int(page_number) < -int(page_number):
    #         raise Http404

    #     comments = paginator.page(page_number)
    #     serializer = CommentSerializer(comments, many=True)
    #     return serializer.data

class BrowsingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = [  
            'name',
            'address',
            'postal_code',
            'likes',
            'id',
            'logo'
            ]

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            'source_id',
            'target_id',
            'timestamp',
            'body',
            'type'
        ]
