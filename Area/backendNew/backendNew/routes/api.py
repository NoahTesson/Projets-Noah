from django.urls import path, include
from backendNew.views import status

# The api/ route manages all the differents requests that can be made to the services.
urlpatterns = [
    path(
        'discord/',
        include("backendNew.routes.discord"),
        name='discord_api'
    ),
    path(
        'google/',
        include("backendNew.routes.google"),
        name='google_api'
    ),
    path(
        'twitter/',
        include("backendNew.routes.twitter"),
        name='twitter_api'
    ),
    path(
        'github/',
        include("backendNew.routes.github"),
        name='github_api'
    ),
    path(
        'spotify/',
        include("backendNew.routes.spotify"),
        name='spotify_api'
    ),
    path(
        'linkedin/',
        include('backendNew.routes.linkedin'),
        name='linkedin_api'
    ),
    path(
        'trello/',
        include('backendNew.routes.trello'),
        name='trello_api'
    ),
    path(
        'getStatus',
        status.getStatus,
        name='status'
    ),
]
