from django.urls import path, include

# These are the principals routes the server exposes.
urlpatterns = [
    path(
        'user/',
        include("backendNew.routes.user"),
        name='user'
    ),
    path(
        'areas/',
        include("backendNew.routes.areas"),
        name='areas'
    ),
    path(
        'api/',
        include("backendNew.routes.api"),
        name='api'
    ),
    path(
        'webhooks/',
        include("backendNew.routes.webhooks"),
        name='webhooks'
    ),
    path(
        'about.json',
        include("backendNew.routes.about"),
        name='about'
    )
]
