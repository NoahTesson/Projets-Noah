Github Functions
================

.. automodule:: django.urls.include
   :no-index:

.. _github-login-function:

**Login Function**

Redirects the user to the GitHub OAuth login page.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: login

**login(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the GitHub OAuth login page.

.. _github-login_profile-function:

**Login Profile Function**

Redirects the user to the GitHub OAuth login page for profile data.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the GitHub OAuth login page for profile data.

.. _github-getUser-function:

**GetUser Function**

Retrieves user data from GitHub.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: getUser

**getUser(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with user data or an error response.

.. _github-redirectToRoot-function:

**RedirectToRoot Function**

Handles the GitHub OAuth callback and redirects to the root page.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: redirectToRoot

**redirectToRoot(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.

.. _github-callback_profile-function:

**Callback Profile Function**

Handles the GitHub OAuth callback for profile data and redirects to the client with an access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: callback_profile

**callback_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.

.. _github-setToken-function:

**SetToken Function**

Sets or updates a GitHub token for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: setToken

**setToken(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the token information or an error response.

.. _github-createRepo-function:

**CreateRepo Function**

Creates a new GitHub repository for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: createRepo

**createRepo(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the repository creation status or an error response.

.. _github-deleteRepo-function:

**DeleteRepo Function**

Deletes a GitHub repository for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: deleteRepo

**deleteRepo(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the repository deletion status or an error response.

.. _github-getListRepo-function:

**GetListRepo Function**

Retrieves a list of GitHub repositories for the specified user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.github
   :members: getListRepo

**getListRepo(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the list of repositories or an error response.
