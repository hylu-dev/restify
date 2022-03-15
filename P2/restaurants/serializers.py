from rest_framework import serializers
from django.shortcuts import get_object_or_404
from restaurants.models import Restaurant, Post, FoodItem, Photo
from accounts.models import Notification

class RestaurantSerializer(serializers.ModelSerializer):
    # Custom serializer field to show owner name instead of id
    # Two queries, since we're checking the User model as well
    owner = serializers.CharField(source='owner.get_full_name', read_only=True)

    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_number', 'owner', 'followers', 'likes']
        read_only_fields = ('followers', 'likes')

    def create(self, data):
        if hasattr(self.context.get('request').user, 'owner'):
            raise serializers.ValidationError("Owner already has a restaurant")
        restaurant = Restaurant.objects.create(
                name=data.get('name',''),
                address=data.get('address',''),
                logo=data.get('logo',''),
                postal_code=data.get('postal_code',''),
                phone_number=data.get('phone_number',''),
                owner=self.context['request'].user
        )
        return restaurant
        
class LikedRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['likes']

    """
    Instead of receiving input and updating the model instance, simply increment
    the likes attribute by 1
    """
    def update(self, instance, validated_data):
        instance.likes += 1
        instance.save()

        return instance

class LikedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['likes']

    """
    Instead of receiving input and updating the model instance, simply increment
    the likes attribute by 1
    """
    def update(self, instance, validated_data):
        instance.likes += 1
        instance.save()

        return instance

class UnlikedRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['likes']

    """
    Instead of receiving input and updating the model instance, simply decrement
    the likes attribute by 1
    """
    def update(self, instance, validated_data):
        instance.likes -= 1
        instance.save()

        return instance

class UnlikedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['likes']

    """
    Instead of receiving input and updating the model instance, simply decrement
    the likes attribute by 1
    """
    def update(self, instance, validated_data):
        instance.likes -= 1
        instance.save()

        return instance

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['name', 'description', 'price']

class AddPhotoSerializer():
    model = Photo
    fields = ['image', 'restaurant']

    def create(self, data):
        photo = Photo.objects.create(
                image=data.get('image',''),
                restaurant=data.get('restaurant',''))
        return photo

class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    restaurant = serializers.CharField(read_only=True)

    class Meta:
        model = Post
        fields = ['timestamp', 'body', 'likes', 'user', 'restaurant']

    def create(self, data):
        restaurant = get_object_or_404(Restaurant, id=self.context.get('id', None))
        user = self.context['request'].user

        # First, create the Post object
        post = Post.objects.create(
            timestamp=data.get('timestamp',''),
            body=data.get('body',''),
            user=user,
            restaurant=restaurant,
        )

        if user.id == restaurant.owner.id:
            # Create a Notification object for any followers (users), spawned from a restaurant posting
            notification = Notification.objects.create(
                source=restaurant,

                target=post,

                body=" has made a new ",
                type='Post',
            )
            notification.users.add(*restaurant.followers.all())
            notification.save()
        else:
            # Create a Notification object for the restaurant owner, spawned from users posting on
            # the restaurant page
            notification = Notification.objects.create(
                source=user,

                target=post,

                body=" has made a new ",
                type='Post',
            )
            notification.users.add(restaurant.owner)
            notification.save()

        return post

