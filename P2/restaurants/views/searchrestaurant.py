from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from accounts.models import User
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, Http404
from django.shortcuts import render
from django.template.response import TemplateResponse
from django.urls import reverse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from django.db.models import Q

from restaurants.models import Restaurant

from rest_framework.pagination import PageNumberPagination
from restaurants.serializers import RestaurantSerializer;
from functools import reduce
import operator

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'


class SearchRestaurantView(ListAPIView):
    """
    Queries all restaurants by a string and returns results sorted by popularity(likes)
    The string can contain multiple terms (space delimited). The search will filter restaurants
    that contain the terms be either name, address, or an item in their menu

     - Query Param - **query**: a string of one or more space delimited search terms
    """ 

    serializer_class = RestaurantSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        if not self.request.query_params.get('query'):
            return Restaurant.objects.all().order_by('-likes')
            
        query = self.request.query_params.get('query').split()
        queryset = Restaurant.objects.all().filter(
            reduce(operator.and_, [(
                Q(name__contains=term) | Q(address__contains=term) | Q(fooditem__name__contains=term)
            ) for term in query])
            ).distinct().order_by('-likes')
        return queryset
