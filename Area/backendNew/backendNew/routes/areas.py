from django.urls import path
from backendNew.views import areas

# The areas/ contains all the routes for areas management.
urlpatterns = [
    path(
        'create',
        areas.create,
        name='create_areas'
    ),
    path(
        'listByUser',
        areas.listByUser,
        name='list_by_user'
    ),
    path(
        'getServicesActions',
        areas.getServicesActions,
        name='get_services_actions'
    ),
    path(
        'getServices',
        areas.getServices,
        name='get_services'
    ),
    path(
        '<_id>',
        areas.getById,
        name='get_by_id'
    ),
]
