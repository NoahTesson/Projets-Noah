from django.urls import path
from backendNew.views import webhooks

# The webhooks/ route contains all the routes about the webhooks.
urlpatterns = [
    path(
        'github',
        webhooks.receiveGitHub,
        name='receive_github_news'
    ),
]