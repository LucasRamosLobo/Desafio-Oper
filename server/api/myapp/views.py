from urllib import response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from rest_framework.response import Response

# Create your views here.

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')
        obj = get_object_or_404(Post, pk=pk)
        return obj

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.likes += 1
        instance.save()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)