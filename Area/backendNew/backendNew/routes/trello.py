from django.urls import path
from backendNew.views import trello

# The trello/ route contains all the routes about trello's API.
urlpatterns = [
    path(
        'login_profile',
        trello.login_profile
    ),
    path(
        'setToken',
        trello.setToken
    ),
    path(
        'createOrganization',
        trello.createOrganization
    ),
    path(
        'createBoard',
        trello.createBoard
    ),
    path(
        'getOrganization',
        trello.getOrganization
    )
]
