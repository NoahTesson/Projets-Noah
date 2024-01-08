from django.urls import path
from backendNew.views import about

# The about.json route returns a list of all the services handled by the project.
urlpatterns = [
    path(
        '',
        about.getAbout,
        name='about.json'
    ),
]