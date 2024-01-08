Spotify Functions
=================

.. automodule:: django.urls.include
   :no-index:

.. _spotify-login-function:

**Login Function**

Redirects the user to the Spotify OAuth login page.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: login

**login(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the Spotify OAuth login page.

.. _spotify-login_profile-function:

**Login Profile Function**

Redirects the user to the Spotify OAuth login page for the profile.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the Spotify OAuth login page for the profile.

.. _spotify-callback-function:

**Callback Function**

Handles the Spotify OAuth callback and retrieves the access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: callback

**callback(request) -> django.shortcuts.redirect or django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.
- (:class:`django.http.JsonResponse`): JSON response in case of an error.

.. _spotify-callback_profile-function:

**Callback Profile Function**

Handles the Spotify OAuth callback for the profile and retrieves the access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: callback_profile

**callback_profile(request) -> django.shortcuts.redirect or django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.
- (:class:`django.http.JsonResponse`): JSON response in case of an error.

.. _spotify-setToken-function:

**SetToken Function**

Sets or updates a Spotify token for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: setToken

**setToken(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the token information or an error response.

.. _spotify-follow_playlist-function:

**Follow Playlist Function**

Follows a Spotify playlist on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: follow_playlist

**follow_playlist(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success or error status code.

.. _spotify-unfollow_playlist-function:

**Unfollow Playlist Function**

Unfollows a Spotify playlist on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: unfollow_playlist

**unfollow_playlist(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.

.. _spotify-follow_artist-function:

**Follow Artist Function**

Follows a Spotify artist on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: follow_artist

**follow_artist(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.

.. _spotify-unfollow_artist-function:

**Unfollow Artist Function**

Unfollows a Spotify artist on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: unfollow_artist

**unfollow_artist(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.

.. _spotify-follow_user-function:

**Follow User Function**

Follows a Spotify user on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: follow_user

**follow_user(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.

.. _spotify-unfollow_user-function:

**Unfollow User Function**

Unfollows a Spotify user on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: unfollow_user

**unfollow_user(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.

.. _spotify-save_track-function:

**Save Track Function**

Saves a Spotify track on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: save_track

**save_track(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.

.. _spotify-unsave_track-function:

**Unsave Track Function**

Unsaves a Spotify track on behalf of the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.spotify
   :members: unsave_track

**unsave_track(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): HTTP response with success status code.
