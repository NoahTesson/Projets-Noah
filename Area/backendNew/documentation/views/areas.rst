Areas Functions
===============

.. automodule:: django.urls.include
   :no-index:

.. _create-view:

**create View**

Create a new rule based on the provided data.

View Function
-------------

.. automodule:: backendNew.backendNew.views.areas
   :members: create

**create(request) -> HttpResponse**

View Details
^^^^^^^^^^^^

**Parameters:**
- ``request`` (:class:`HttpRequest`): The HTTP request object.

**Return Value:**
- (:class:`HttpResponse`): HTTP response containing the created rule data.

.. _listByUser-view:

**listByUser View**

List rules created by the authenticated user.

View Function
-------------

.. automodule:: backendNew.backendNew.views.areas
   :members: listByUser

**listByUser(request) -> HttpResponse**

View Details
^^^^^^^^^^^^

**Parameters:**
- ``request`` (:class:`HttpRequest`): The HTTP request object.

**Return Value:**
- (:class:`HttpResponse`): HTTP response containing a list of rules.

.. _getServicesActions-view:

**getServicesActions View**

Get actions provided by specific services.

View Function
-------------

.. automodule:: backendNew.backendNew.views.areas
   :members: getServicesActions

**getServicesActions(request) -> HttpResponse**

View Details
^^^^^^^^^^^^

**Parameters:**
- ``request`` (:class:`HttpRequest`): The HTTP request object.

**Return Value:**
- (:class:`HttpResponse`): HTTP response containing a list of service actions.

.. _getServices-view:

**getServices View**

Get unique service names based on the provided type.

View Function
-------------

.. automodule:: backendNew.backendNew.views.areas
   :members: getServices

**getServices(request) -> HttpResponse**

View Details
^^^^^^^^^^^^

**Parameters:**
- ``request`` (:class:`HttpRequest`): The HTTP request object.

**Return Value:**
- (:class:`HttpResponse`): HTTP response containing unique service names.

.. _getById-view:

**getById View**

Get, delete, or update a rule based on the provided ID.

View Function
-------------

.. automodule:: backendNew.backendNew.views.areas
   :members: getById

**getById(request, _id) -> HttpResponse**

View Details
^^^^^^^^^^^^

**Parameters:**
- ``request`` (:class:`HttpRequest`): The HTTP request object.
- ``_id`` (int): The ID of the rule to retrieve, delete, or update.

**Return Value:**
- (:class:`HttpResponse`): HTTP response containing the rule data or operation status.
