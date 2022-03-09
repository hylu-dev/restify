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
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse

from accounts.serializers import ProfileSerializer;

class ProfileView(RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        user_obj = get_object_or_404(User, id=self.kwargs['id'])
        return user_obj
