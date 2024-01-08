from django.urls import path
from backendNew.views import spotify

# The spotify/ route contains all the routes about spotify's API.
urlpatterns = [
    path(
        'login',
        spotify.login
    ),
    path(
        'callback',
        spotify.callback
    ),
    path(
        'login_profile',
        spotify.login_profile
    ),
    path(
        'callback_profile',
        spotify.callback_profile
    ),
    path(
        'setToken',
        spotify.setToken
    ),
    path(
        'follow_playlist',
        spotify.follow_playlist
    ),
    path(
        'unfollow_playlist',
        spotify.unfollow_playlist
    ),
    path(
        'follow_artist',
        spotify.follow_artist
    ),
    path(
        'unfollow_artist',
        spotify.unfollow_artist
    ),
    path(
        'follow_user',
        spotify.follow_user
    ),
    path(
        'unfollow_user',
        spotify.unfollow_user
    ),
    path(
        'save_track',
        spotify.save_track
    ),
    path(
        'unsave_track',
        spotify.unsave_track
    ),
]
