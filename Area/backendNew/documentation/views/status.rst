Status Function
===============

.. automodule:: django.urls.include
   :no-index:

.. _status-function:

Retrieve the status of user-connected services.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.status
   :members: getStatus

**getStatus(request) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response with the status of user-connected services.
