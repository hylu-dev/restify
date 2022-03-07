from rest_framework import serializers

from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'password',
            'username',
            'email',
            'phone_number',
            'avatar'
        ]

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'password',
            'username',
            'email',
            'phone_number',
            'avatar'
        ]