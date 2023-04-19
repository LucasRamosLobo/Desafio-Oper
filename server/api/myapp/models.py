from django.db import models

class Post(models.Model):
    id_notice = models.TextField(default='non-exist')
    email = models.CharField(max_length=100, default='non-exist')
    content = models.TextField(default='non-exist')
    likes = models.IntegerField(default=0)
