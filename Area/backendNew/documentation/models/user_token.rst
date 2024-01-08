UserToken Model
===============

.. module:: backendNew.models.UserToken
   :platform: Any
   :synopsis: Model for storing user tokens associated with UserModel.

Model
-----

.. class:: UserToken

    Model for storing user tokens associated with UserModel.

    :param int id: The primary key for the UserToken instance.
    :param str token: The user token (max length: 80 characters, unique).
    :param datetime created_at: The timestamp when the token was created.
    :param int user_id: The foreign key to UserModel.

    Meta
    ~~~~

    .. attribute:: db_table

        The database table name for the UserToken model.

    Methods
    ~~~~~~~~

    .. method:: to_dict()

        Convert the UserToken object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict

Attributes
----------

- ``id``: The primary key for the UserToken instance.
- ``token``: The user token (max length: 80 characters, unique).
- ``created_at``: The timestamp when the token was created.
- ``user_id``: The foreign key to UserModel.

Methods
-------

- ``to_dict()``: Convert the UserToken object to a dictionary.

    This method returns a dictionary with the following keys:
    - ``id``: The primary key.
    - ``token``: The user token.
    - ``created_at``: The timestamp when the token was created.
    - ``user``: The associated user (UserModel instance).
