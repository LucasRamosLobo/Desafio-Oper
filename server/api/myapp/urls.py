from django.urls import path
from . import views
from .views import PostList


urlpatterns = [
    path('posts/', PostList.as_view()),
]