TokensModel Model
=================

.. module:: backendNew.models.TokensModel
   :platform: Any
   :synopsis: Model for storing user tokens for various services.

Model
-----

.. class:: TokensModel

    Model for storing user tokens for various services.

    :param int user_id: The primary key for the TokensModel instance.
    :param str googleToken: The Google token (max length: 255 characters, nullable).
    :param str twitterToken: The Twitter token (max length: 255 characters, nullable).
    :param str githubToken: The GitHub token (max length: 255 characters, nullable).
    :param str discordToken: The Discord token (max length: 255 characters, nullable).
    :param str spotifyToken: The Spotify token (max length: 500 characters, nullable).
    :param str linkedinToken: The LinkedIn token (max length: 500 characters, nullable).
    :param str trelloToken: The Trello token (max length: 500 characters, nullable).

    Meta
    ~~~~

    .. attribute:: db_table

        The database table name for the TokensModel model.

    Methods
    ~~~~~~~~

    .. method:: to_dict()

        Convert the TokensModel object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict

Attributes
----------

- ``user_id``: The primary key for the TokensModel instance.
- ``googleToken``: The Google token (max length: 255 characters, nullable).
- ``twitterToken``: The Twitter token (max length: 255 characters, nullable).
- ``githubToken``: The GitHub token (max length: 255 characters, nullable).
- ``discordToken``: The Discord token (max length: 255 characters, nullable).
- ``spotifyToken``: The Spotify token (max length: 500 characters, nullable).
- ``linkedinToken``: The LinkedIn token (max length: 500 characters, nullable).
- ``trelloToken``: The Trello token (max length: 500 characters, nullable).

Methods
-------

- ``to_dict()``: Convert the TokensModel object to a dictionary.

    This method returns a dictionary with the following keys:
    - ``user_id``: The primary key.
    - ``googleToken``: The Google token.
    - ``twitterToken``: The Twitter token.
    - ``githubToken``: The GitHub token.
    - ``discordToken``: The Discord token.
    - ``spotifyToken``: The Spotify token.
    - ``linkedinToken``: The LinkedIn token.
    - ``trelloToken``: The Trello token.