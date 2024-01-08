from django.urls import path
from backendNew.views import google

# The google/ route contains all the routes about google's API.
urlpatterns = [
    path(
        'login',
        google.login,
        name='google_login'
    ),
    path(
        'login_profile',
        google.login_profile,
        name='google_login_profile'
    ),
    path(
        'callback',
        google.callback,
        name='google_callback'
    ),
    path(
        'callback_profile',
        google.callback_profile,
        name='google_allback_profile'
    ),
    path(
        'redirectToRoot',
        google.redirectToRoot,
        name='google_redirectToRoot'
    ),
    path(
        'setToken',
        google.setToken
    ),
    path(
        'getAllCalendar',
        google.getAllCalendar
    ),
    path(
        'spreadsheet/add_new_row',
        google.add_new_row,
        name='add_new_row'
    ),
    path(
        'sendEmail',
        google.sendEmail,
        name='sendEmail'
    ),
]
