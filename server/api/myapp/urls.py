from django.urls import path
from . import views
from .views import PostList, PostDetail, CreateCommentView


urlpatterns = [
    path('posts/', PostList.as_view(), name='post_list'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    path('posts/responses/', CreateCommentView.as_view()),
]