CheckForReactions Functions
===========================

.. automodule:: django.urls.include
   :no-index:

.. _checkForReactions-function:

**checkForReactions Function**

Check for reactions and generate corresponding URLs based on the provided parameters.

Function Signature
------------------

.. automodule:: backendNew.backendNew.views.checkForReactions
   :members: checkForReactions

**checkForReactions(app, event, content, triggerToken) -> str or None**

Function Details
^^^^^^^^^^^^^^^^^

**Parameters:**
- ``app`` (str): The application or service name.
- ``event`` (str): The event or action.
- ``content`` (str): The content or data associated with the event.
- ``triggerToken`` (str): The trigger token for authorization.

**Return Value:**
- (str or None): The URL generated based on the reaction, or None if no matching reaction is found.
