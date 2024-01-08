User Authentication and Password Reset API
==========================================

.. automodule:: django.urls.include
   :no-index:

.. _signup-function:

**Signup Function**

User registration endpoint.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: signup

**signup(request) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response with the user's token or an error response.

Function Description
--------------------

This function allows users to sign up by providing their name, surname, email, and password. If the email is unique, a user account is created. It expects a POST request with JSON data containing user details.

If the provided email is unique, a new user is created with the given details, and a unique token is generated for the user. The function returns a JSON response with the generated token. If the email already exists, it returns an error response.

.. _signin-function:

**Signin Function**

User login endpoint.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: signin

**signin(request) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response with the user's token or an error response.

Function Description
--------------------

This function allows users to sign in by providing their email and password. If the credentials are correct, a new token is generated for the user. It expects a POST request with JSON data containing the user's email and password.

If the provided credentials are correct, a new token is generated and associated with the user. The function returns a JSON response with the generated token. If the credentials are invalid, it returns an error response.

.. _signup_auth-function:

**Signup Auth Function**

User authentication for sign-up with an external provider.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: signup_auth

**signup_auth(request) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response with the user's token or an error response.

Function Description
--------------------

This function allows users to sign up using an external provider (e.g., Twitter) by providing their name, email, token, and the provider name. It expects a POST request with JSON data containing user details.

Depending on the external provider (e.g., Twitter), it validates the provided token and creates a new user if the authentication is successful. The function returns a JSON response with the generated token. If the authentication fails, it returns an error response.

.. _signin_auth-function:

**Signin Auth Function**

User authentication for sign-in with an external provider.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: signin_auth

**signin_auth(request) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response with the user's token or an error response.

Function Description
--------------------

This function allows users to sign in using an external provider (e.g., Twitter) by providing their email and token. It expects a POST request with JSON data containing user details.

Depending on the external provider (e.g., Twitter), it validates the provided token and generates a new token for the user. The function returns a JSON response with the generated token. If the authentication fails, it returns an error response.

.. _user_exists-function:

**User Exists Function**

Check if a user exists based on their email.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: user_exists

**user_exists(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the user's details or an error response.

Function Description
--------------------

This function checks if a user exists in the database based on their email. It expects a POST request with JSON data containing the user's email.

If the user exists, it returns a JSON response with the user's details. If the user does not exist, it returns an error response.

.. _sendMail-function:

**SendMail Function**

Send a password reset email.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: sendMail

**sendMail(request) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response indicating success or an error response.

Function Description
--------------------

This function sends a password reset email to the user's email address. It expects a POST request with JSON data containing the user's email.

The function generates a unique token and sends a password reset email to the user's email address. It returns a JSON response indicating success. If there's an error, it returns an error response.

.. _resetPassword-function:

**ResetPassword Function**

Reset the user's password.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: resetPassword

**resetPassword(request, token) -> django.http.JsonResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.
- ``token``: Reset password token.

**Return Value:**
- (:class:`django.http.JsonResponse`): JSON response indicating success or an error response.

Function Description
--------------------

This function resets the user's password based on a provided token. It expects a POST request with JSON data containing the new password and the token.

If the provided token is valid and not expired, it changes the user's password and deletes the token. The function returns a JSON response indicating success. If the token is invalid or expired, it returns an error response.

.. _isTokenValid-function:

**IsTokenValid Function**

Check if the user's authentication token is valid.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.views
   :members: isTokenValid

**isTokenValid(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the user's details or an error response.

Function Description
--------------------

This function checks if the user's authentication token is valid for the given provider (e.g., Twitter or Google). It expects a POST request with JSON data containing the provider name (e.g., Twitter or Google).

Depending on the provider, it validates the user's authentication token and returns a JSON response with the user's details. If the token is invalid or the provider is not recognized, it returns an error response.

.. _me-function:

**Me Function**

Get the user's profile details
