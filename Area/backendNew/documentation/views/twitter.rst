Twitter Functions
=================

.. automodule:: django.urls.include
   :no-index:

.. _twitter-login-function:

**Login Function**

Redirects the user to the Twitter authorization page for standard access.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.twitter
   :members: login

**login(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirects the user to the Twitter authorization page.

Function Description
--------------------

This function initiates the Twitter OAuth authorization flow to allow the user to grant access to their Twitter account for standard access. It constructs the Twitter authorization URL with the necessary parameters and redirects the user to that URL.

.. _twitter-login_profile-function:

**Login Profile Function**

Redirects the user to the Twitter authorization page for profile access.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.twitter
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirects the user to the Twitter authorization page.

Function Description
--------------------

This function initiates the Twitter OAuth authorization flow to allow the user to grant access to their Twitter account for profile access. It constructs the Twitter authorization URL with the necessary parameters and redirects the user to that URL.

.. _twitter-callback-function:

**Callback Function**

Handle the callback after Twitter authorization.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.twitter
   :members: callback

**callback(request) -> django.shortcuts.redirect or django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirects the user to the specified endpoint with the access token.
- (:class:`django.http.JsonResponse`): Returns an error response.

Function Description
--------------------

This function handles the callback from Twitter after user authorization and stores the Twitter access token in the database. It first checks for errors and returns an error response if an error occurred.

If the authorization is successful, it extracts the authorization code and email, and uses them to obtain an access token from Twitter. If the access token is obtained successfully, it is stored in the database. The function then redirects the user to a specified endpoint with the access token, or returns an error response if there are issues.

.. _twitter-callback_profile-function:

**Callback Profile Function**

Handle the callback after Twitter authorization for profile access.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.twitter
   :members: callback_profile

**callback_profile(request) -> django.shortcuts.redirect or django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirects the user to the specified endpoint with the access token.
- (:class:`django.http.JsonResponse`): Returns an error response.

Function Description
--------------------

This function handles the callback from Twitter after user authorization for profile access. It is similar to the `callback` function but is designed for profile access. It checks for errors and returns an error response if an error occurred.

If the authorization is successful, it extracts the authorization code and obtains an access token from Twitter. If the access token is obtained successfully, it redirects the user to a specified endpoint with the access token, or returns an error response if there are issues.

.. _twitter-auth-function:

**Auth Function**

Authenticate user and obtain Twitter tokens.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.twitter
   :members: auth

**auth(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the Twitter tokens and user profile information.
