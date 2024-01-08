Trello Functions
================

.. automodule:: django.urls.include
   :no-index:

.. _trello-login-profile-function:

**Login Profile Function**

Redirects the user to the Trello authorization page for profile access.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.trello
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirects the user to the Trello authorization page.

Function Description
--------------------

This function initiates the Trello OAuth authorization flow to allow the user to grant access to their Trello profile. It constructs the Trello authorization URL with the necessary parameters and redirects the user to that URL.

.. _trello-setToken-function:

**SetToken Function**

Set and store the Trello access token for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.trello
   :members: setToken

**setToken(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the stored Trello access token.
