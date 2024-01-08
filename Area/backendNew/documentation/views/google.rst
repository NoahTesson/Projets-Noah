Google Functions
================

.. automodule:: django.urls.include
   :no-index:

.. _google-login-function:

**Login Function**

Redirects the user to the Google OAuth login page based on the device type.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: login

**login(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the Google OAuth login page.

.. _google-login_profile-function:

**Login Profile Function**

Redirects the user to the Google OAuth login page for profile data.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the Google OAuth login page for profile data.

.. _google-callback-function:

**Callback Function**

Handles the Google OAuth callback and redirects to the client with an access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: callback

**callback(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.

.. _google-callback_profile-function:

**Callback Profile Function**

Handles the Google OAuth callback for profile data and redirects to the client with an access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: callback_profile

**callback_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.

.. _google-redirectToRoot-function:

**RedirectToRoot Function**

Handles the Google OAuth callback and redirects to the client with an access token.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: redirectToRoot

**redirectToRoot(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response with the user's access token.

.. _google-setToken-function:

**SetToken Function**

Sets or updates a Google token for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: setToken

**setToken(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the token information or an error response.

.. _google-getAllCalendar-function:

**GetAllCalendar Function**

Retrieves the user's Google Calendar data.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: getAllCalendar

**getAllCalendar(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the Google Calendar data or an error response.

.. _google-create_file-function:

**CreateFile Function**

Creates a Google Drive file with the specified title.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: create_file

**create_file(title, googleToken) -> str**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``title``: The title of the file.
- ``googleToken``: The user's Google token.

**Return Value:**
- (:class:`str`): The ID of the created Google Drive file.

.. _google-add_new_row-function:

**AddNewRow Function**

Adds a new row to a Google Sheets document.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: add_new_row

**add_new_row(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with a success message or an error response.

.. _google-sendEmail-function:

**SendEmail Function**

Sends an email to the specified recipient.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.google
   :members: sendEmail

**sendEmail(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with a success message or an error response.
