from django.urls import path
from backendNew.views import linkedin

# The linkedin/ route contains all the routes about linkedin's API.
urlpatterns = [
    path(
        'login_profile',
        linkedin.login_profile
    ),
    path(
        'callback',
        linkedin.callback
    ),
    path(
        'setToken',
        linkedin.setToken
    ),
    path(
        'postALinkedinPost',
        linkedin.postALinkedinPost
    ),
]
