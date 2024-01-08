ResetPassword Model
===================

.. module:: backendNew.models.ResetPassword
   :platform: Any
   :synopsis: Model for storing reset password tokens.

Model
-----

.. class:: ResetPassword

    Model for storing reset password tokens.

    :param int id: The primary key for the ResetPassword instance.
    :param int user_id: The user ID associated with the token.
    :param str token: The reset password token (max length: 255 characters).
    :param datetime created_at: The timestamp when the token was created (auto-generated).

    Meta
    ~~~~

    .. attribute:: db_table

        The database table name for the ResetPassword model.

    Methods
    ~~~~~~~~

    .. method:: to_dict()

        Convert the ResetPassword object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict

Attributes
----------

- ``id``: The primary key for the ResetPassword instance.
- ``user_id``: The user ID associated with the token.
- ``token``: The reset password token (max length: 255 characters).
- ``created_at``: The timestamp when the token was created (auto-generated).

Methods
-------

- ``to_dict()``: Convert the ResetPassword object to a dictionary.

    This method returns a dictionary with the following keys:
    - ``id``: The primary key.
    - ``user_id``: The user ID.
    - ``token``: The reset password token.
    - ``created_at``: The creation timestamp in the format 'YYYY-MM-DD HH:MM:SS'.
