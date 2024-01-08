from django.urls import path
from backendNew.views import views

# The user/ route contains all the routes about users management.
urlpatterns = [
    path(
        'singin_auth',
        views.singin_auth,
        name='singin_auth'
    ),
    path(
        'signup_auth',
        views.singup_auth,
        name='singup_auth'
    ),
    path(
        'exists',
        views.user_exists,
        name='user_exists'
    ),
    path(
        'signin',
        views.signin,
        name='signin'
    ),
    path(
        'signup',
        views.signup,
        name='signup'
    ),
    path(
        'resetPassword',
        views.sendMail,
        name='sendMail'
    ),
    path(
        'resetPassword/<token>',
        views.resetPassword,
        name='resetPassword'
    ),
    path(
        'isTokenValid',
        views.isTokenValid,
        name='isTokenValid'
    ),
    path(
        'me',
        views.me,
        name='me'
    ),
]
