from django.urls import path
from backendNew.views import github

# The github/ route contains all the routes about github's API.
urlpatterns = [
    path(
        'login',
        github.login,
        name='github_login'
    ),
    path(
        'login_profile',
        github.login_profile,
        name='github_login_profile'
    ),
    path(
        'callback_profile',
        github.callback_profile,
        name='github_callback_profile'
    ),
    path(
        'setToken',
        github.setToken,
        name='github_set_token'
    ),
    path(
        'redirectToRoot',
        github.redirectToRoot,
        name='github_redirectToRoot'
    ),
    path(
        'getUser',
        github.getUser,
        name='github_getUser'
    ),
    path(
        'createRepo',
        github.createRepo,
        name='github_create_repo'
    ),
    path(
        'removeRepo',
        github.deleteRepo,
        name='github_remove_repo'
    ),
    path(
        'getRepo',
        github.getListRepo,
        name='github_list_repo'
    ),
]
