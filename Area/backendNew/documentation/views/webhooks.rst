GitHub Webhook Data Handling API
================================

.. automodule:: django.urls.include
   :no-index:

.. _receiveGitHub-function:

**Receive GitHub Function**

Receive GitHub webhook data.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.webhooks
   :members: receiveGitHub

**receiveGitHub(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response or HTTP status code indicating the result of processing the GitHub webhook data.

Function Description
--------------------

This function handles incoming GitHub webhook data, parses it using the GitHubParser, and checks for reactions using checkForReactions.

It expects a POST request with JSON data containing GitHub webhook information.

- If the provided data is parsed successfully and contains valid action and message information, it checks for reactions using the "checkForReactions" function.

- If "checkForReactions" returns a path (i.e., a URL or message), the function returns a JSON response with the path and an HTTP status code of 200.

- If the provided action or message is "default," it returns an HTTP response with a "Not Implemented" status code of 501.

- If the request method is not POST, it returns an HTTP response with an "Invalid Method" status code of 405.

- For any other errors or exceptions, it returns an HTTP response with an internal server error status code of 500.
