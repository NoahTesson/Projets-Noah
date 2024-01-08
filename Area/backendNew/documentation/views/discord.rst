Discord Functions
=================

.. automodule:: django.urls.include
   :no-index:

.. _discord-login-function:

**Login Function**

Redirects the user to the Discord OAuth login page.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: login

**login(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the Discord OAuth login page.

.. _discord-login_profile-function:

**Login Profile Function**

Redirects the user to the Discord OAuth login page for profile data.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: login_profile

**login_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the Discord OAuth login page for profile data.

.. _discord-callback-function:

**Callback Function**

Handles the callback after a user logs in via Discord OAuth.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: callback

**callback(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the client with an access token.

.. _discord-callback_profile-function:

**Callback Profile Function**

Handles the callback for profile data after a user logs in via Discord OAuth.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: callback_profile

**callback_profile(request) -> django.shortcuts.redirect**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect`): Redirect response to the client with an access token.

.. _discord-setToken-function:

**SetToken Function**

Sets or updates a Discord token for the user.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: setToken

**setToken(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the token information or an error response.

.. _discord-getGuilds-function:

**GetGuilds Function**

Gets the guilds (servers) the user is a member of.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: getGuilds

**getGuilds(request) -> django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.http.HttpResponse`): JSON response with the list of guilds or an error response.

.. _discord-updateStatus-function:

**UpdateStatus Function**

Handles the user's status update event.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: updateStatus

**updateStatus(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-userTyping-function:

**UserTyping Function**

Handles the user typing event in a channel.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: userTyping

**userTyping(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-userJoin-function:

**UserJoin Function**

Handles the user joining a server event.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: userJoin

**userJoin(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-userRemove-function:

**UserRemove Function**

Handles the user being removed from a server event.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: userRemove

**userRemove(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-userBan-function:

**UserBan Function**

Handles the user being banned from a server event.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: userBan

**userBan(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-userUnban-function:

**UserUnban Function**

Handles the user being unbanned from a server event.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: userUnban

**userUnban(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-messageChannel-function:

**MessageChannel Function**

Handles the event of a message being sent to a channel.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: messageChannel

**messageChannel(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-channelCreate-function:

**ChannelCreate Function**

Handles the event of a new channel being created.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: channelCreate

**channelCreate(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-channelUpdate-function:

**ChannelUpdate Function**

Handles the event of an existing channel being updated.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: channelUpdate

**channelUpdate(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-channelDelete-function:

**ChannelDelete Function**

Handles the event of a channel being deleted.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: channelDelete

**channelDelete(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.

.. _discord-pinsUpdate-function:

**PinsUpdate Function**

Handles the event of a message being pinned in a channel.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.discord
   :members: pinsUpdate

**pinsUpdate(request) -> django.shortcuts.redirect or django.http.HttpResponse**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The HTTP request object.

**Return Value:**
- (:class:`django.shortcuts.redirect` or :class:`django.http.HttpResponse`): A redirection to a reaction path or a success response.
