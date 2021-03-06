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

from restaurants.models import Post

from rest_framework.pagination import PageNumberPagination
from restaurants.serializers import PostSerializer;

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class RestaurantPostsView(ListAPIView):
    """
    Returns all posts for a given restaurant

     - Path Param - **id**: id of the restaurant to get posts from
    """ 

    serializer_class = PostSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        queryset = Post.objects.filter(restaurant__id=self.kwargs['id']).order_by('-timestamp')
        return queryset
