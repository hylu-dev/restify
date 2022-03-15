from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import render
from django.template.response import TemplateResponse
from django.urls import reverse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist

from restaurants.models import Restaurant, LikedRestaurant, LikedPost, Post, FoodItem

from restaurants.serializers.restaurant import FoodItemSerializer

class UpdateFoodItemView(UpdateAPIView):
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(FoodItem, restaurant=self.request.user.owner, id=self.kwargs['id'])