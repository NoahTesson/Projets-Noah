from django.urls import path
from backendNew.views import twitter

# The twitter/ route contains all the routes about twitter's API.
urlpatterns = [
    path(
        'login',
        twitter.login
    ),
    path(
        'login_profile',
        twitter.login_profile
    ),
    path(
        'callback',
        twitter.callback
    ),
    path(
        'callback_profile',
        twitter.callback_profile
    ),
    path(
        'auth',
        twitter.auth
    ),
    path(
        'setToken',
        twitter.setToken
    ),
    path(
        'postTweet',
        twitter.postTweet
    ),
]
