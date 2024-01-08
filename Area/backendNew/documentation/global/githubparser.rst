Githubparser Class
==================


.. automodule:: backendNew.utils.githubparser
   :members:

Githubparser Class
------------------

The `Githubparser` class is used for parsing Github webhooks responses.

GithubParser.parseWebhook Method
--------------------------------

.. automethod:: GithubParser.parseWebhook
   :noindex:

   This method parses a Github webhook response and returns a dictionary with action and message information.

   Parameters:
     - `resp` (dict): The Github webhook response to parse.

   Returns:
     - A dictionary containing the action and message.

   Possible actions and their corresponding messages:

   - When a user pushes to a repository: "When a user push"
   - When a user creates a repository: "When a user create a repository"
   - When a user opens a pull request: "When a user open a pull request"
   - When a user closes a pull request: "When a user close a pull request"
   - When a user creates a branch: "When a user create a branch"
   - When a user merges a branch: "When a user merge a branch"
