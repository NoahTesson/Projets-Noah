UserModel Model
===============

.. module:: backendNew.models.UserModel
   :platform: Any
   :synopsis: Model for storing user information.

Model
-----

.. class:: UserModel

    Model for storing user information.

    :param int id: The primary key for the UserModel instance.
    :param str name: The user's name (max length: 80 characters, not null).
    :param str surname: The user's surname (max length: 80 characters, not null).
    :param str email: The user's email address (max length: 80 characters, unique).
    :param str password: The user's password (max length: 255 characters, not null).
    :param datetime created_at: The timestamp when the user was created.

    Meta
    ~~~~

    .. attribute:: db_table

        The database table name for the UserModel model.

    Methods
    ~~~~~~~~

    .. method:: to_dict(excludePassword: bool = False)

        Convert the UserModel object to a dictionary.

        :param excludePassword: If True, the 'password' field will be excluded from the dictionary.
        :type excludePassword: bool
        :return: A dictionary containing the object's attributes.
        :rtype: dict

Attributes
----------

- ``id``: The primary key for the UserModel instance.
- ``name``: The user's name (max length: 80 characters, not null).
- ``surname``: The user's surname (max length: 80 characters, not null).
- ``email``: The user's email address (max length: 80 characters, unique).
- ``password``: The user's password (max length: 255 characters, not null).
- ``created_at``: The timestamp when the user was created.

Methods
-------

- ``to_dict(excludePassword: bool = False)``: Convert the UserModel object to a dictionary.

    This method returns a dictionary with the following keys:
    - ``id``: The primary key.
    - ``name``: The user's name.
    - ``surname``: The user's surname.
    - ``email``: The user's email address.
    - ``password``: (optional) The user's password (excluded if excludePassword is True).
