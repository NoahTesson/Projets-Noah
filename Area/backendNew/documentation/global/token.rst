Token Functions
===============

.. automodule:: backendNew.utils.token
   :members:

Module Overview
---------------

This module provides functions for generating and managing tokens. It includes the following functions:

- :func:`generateToken`: Generates a random token with a specific format.
- :func:`check_token`: Checks if a token is still valid.
- :func:`analyseToken`: Analyzes a token from a request.

Functions
---------

.. _generateToken-function:

**GenerateToken Function**

Generates a random token with a specific format.

Function Signature
------------------

.. automodule:: backendNew.utils.token
   :members: generateToken

**generateToken(size = 32, indexes = [7, 11, 15, 19]) -> str**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``size``: The size of the token.
- ``indexes``: The indexes where you want the '-' to be.

**Return Value:**
- (:class:`str`): The newly generated token.

.. _check_token-function:

**Check_token Function**

Checks if a token is still valid.

Function Signature
------------------

.. automodule:: backendNew.utils.token
   :members: check_token

**check_token(token, minutes=30) -> bool**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``token``: The token to check.
- ``minutes``: The time you want the tokens to be valid.

**Return Value:**
- (:class:`bool`): True if the token is valid, False otherwise.

.. _analyseToken-function:

**AnalyseToken Function**

Checks if a token is still valid.

Function Signature
------------------

.. automodule:: backendNew.utils.token
   :members: analyseToken

**analyseToken(request) -> str or None**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``request``: The Http request.

**Return Value:**
- (:class:`str`): The token if it is valid, None otherwise.
