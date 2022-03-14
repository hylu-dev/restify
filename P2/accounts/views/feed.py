from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from accounts.models import User
from restaurants.models import Post, Restaurant
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
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

from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
from accounts.serializers import ProfileSerializer;

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'

class FeedView(ListAPIView):
    serializer_class = FeedSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.filter(restaurant__in=Restaurant.objects.filter(followers=self.request.user)).order_by('-timestamp')
        return queryset
