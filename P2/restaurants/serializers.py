from rest_framework import serializers
from django.shortcuts import get_object_or_404
from restaurants.models import Restaurant, Post, FoodItem, Photo
from django.core.exceptions import BadRequest

from restaurants.models import Restaurant, Post, FoodItem
from accounts.models import Notification

class RestaurantSerializer(serializers.ModelSerializer):
    # Custom serializer field to show owner name instead of id
    # Two queries, since we're checking the User model as well
    owner = serializers.CharField(source='owner.get_full_name', read_only=True)

    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'logo', 'postal_code', 'phone_number', 'owner', 'followers', 'likes']

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

    def create(self, data):
        if not hasattr(self.context.get('request').user, 'owner'):
            raise serializers.ValidationError("User does not have a restaurant to add a food item to")
        restaurant = self.context.get('request').user.owner

        if restaurant.owner.id == self.context['request'].user.id:
            # First create the food item for the menu
            foodItem = FoodItem.objects.create(
                restaurant=restaurant,
                name=data.get('name', ''),
                description=data.get('description', ''),
                price=data.get('price', '')
            )

            # Create a notification for followers (users) to know that the menu was updated
            # Do nothing if there are no followers for this restaurant
            if restaurant.followers.first():
                notification = Notification.objects.create(
                    source=restaurant,

                    target=foodItem,

                    body=" has updated their ",
                    type='Update',
                )
                notification.users.add(*restaurant.followers.all())
                notification.save()

            return foodItem

        else:
            raise BadRequest
    
    def update(self, instance, validated_data):
        restaurant=self.context['request'].user.owner

        if restaurant.owner.id == self.context['request'].user.id:
            instance.name = validated_data.get('name')
            instance.description = validated_data.get('description')
            instance.price = validated_data.get('price')
            instance.save()

            # Create a notification for followers (users) to know that the menu was updated
            # Do nothing if there are no followers for this restaurant
            if restaurant.followers.first():
                notification = Notification.objects.create(
                    source=restaurant,

                    target=instance,

                    body=" has updated their ",
                    type='Update',
                )
                notification.users.add(*restaurant.followers.all())
                notification.save()

            return instance

        else:
            raise BadRequest

class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    restaurant = serializers.CharField(read_only=True)

    class Meta:
        model = Post
        fields = ['timestamp', 'body', 'likes', 'user', 'restaurant']

    def create(self, data):
        if not hasattr(self.context.get('request').user, 'owner'):
            raise serializers.ValidationError("User does not have a restaurant to post on")
        restaurant = self.context.get('request').user.owner
        user = self.context['request'].user

        # First, create the Post object
        post = Post.objects.create(
            timestamp=data.get('timestamp',''),
            body=data.get('body',''),
            user=user,
            restaurant=restaurant,
        )

        if user.id == restaurant.owner.id:
            # Create a Notification object for any followers, if applicable, spawned from a restaurant posting
            if restaurant.followers.first():
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

class PhotoSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(read_only=True)
    image = serializers.ImageField()

    class Meta:
        model = Photo
        fields = ['restaurant', 'image']

    def create(self, data):
        restaurant = get_object_or_404(Restaurant, id=self.context.get('id', None))

        photo = Photo.objects.create(
            image =image,
            restaurant=restaurant
        )

        return photo

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['restaurant', 'image']


