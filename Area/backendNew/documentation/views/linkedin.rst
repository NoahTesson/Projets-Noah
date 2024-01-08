Linkedin Functions
==================

.. automodule:: django.urls.include
   :no-index:

.. _linkedin-login_profile-function:

**Login Profile Function**

Redirects the user to the LinkedIn OAuth login page.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.linkedin
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the LinkedIn OAuth login page.

.. _linkedin-callback-function:

**Callback Function**

Handles the LinkedIn OAuth callback and retrieves the access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.linkedin
   :members: callback

**callback(request) -> django.shortcuts.redirect or django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.
- (:class:`django.http.JsonResponse`): JSON response in case of an error.

.. _linkedin-setToken-function:

**SetToken Function**

Sets or updates a LinkedIn token for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.linkedin
   :members: setToken

**setToken(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the token information or an error response.

.. _linkedin-postALinkedinPost-function:

**Post a LinkedIn Post Function**

Posts a message to LinkedIn on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.linkedin
   :members: postALinkedinPost

**postALinkedinPost(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with a success message or an error response.
