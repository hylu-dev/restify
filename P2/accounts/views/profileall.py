from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from accounts.models import User
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
    max_page_size = 2

class ProfileAllView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = SmallResultsSetPagination
