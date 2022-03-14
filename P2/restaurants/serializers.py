from rest_framework import serializers

from restaurants.models import Restaurant

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