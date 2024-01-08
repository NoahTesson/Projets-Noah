RuleModel Model
===============

.. module:: backendNew.models.RuleModel
   :platform: Any
   :synopsis: Model for storing rule information.

Model
-----

.. class:: RuleModel

    Model for storing rule information.

    :param int id: The primary key for the RuleModel instance.
    :param str title: The title of the rule (max length: 255 characters, nullable).
    :param str description: The description of the rule (max length: 255 characters, nullable).
    :param int user_id: The user ID associated with the rule.
    :param int trigger_id: The ID of the trigger associated with the rule.
    :param str triggerToken: The trigger token (max length: 255 characters, nullable).
    :param int action_id: The ID of the action associated with the rule.
    :param str actionToken: The action token (max length: 255 characters, nullable).
    :param datetime created_at: The timestamp when the rule was created (auto-generated).

    Meta
    ~~~~

    .. attribute:: db_table

        The database table name for the RuleModel model.

    Methods
    ~~~~~~~~

    .. method:: to_dict()

        Convert the RuleModel object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict

Attributes
----------

- ``id``: The primary key for the RuleModel instance.
- ``title``: The title of the rule (max length: 255 characters, nullable).
- ``description``: The description of the rule (max length: 255 characters, nullable).
- ``user_id``: The user ID associated with the rule.
- ``trigger_id``: The ID of the trigger associated with the rule.
- ``triggerToken``: The trigger token (max length: 255 characters, nullable).
- ``action_id``: The ID of the action associated with the rule.
- ``actionToken``: The action token (max length: 255 characters, nullable).
- ``created_at``: The timestamp when the rule was created (auto-generated).

Methods
-------

- ``to_dict()``: Convert the RuleModel object to a dictionary.

    This method returns a dictionary with the following keys:
    - ``id``: The primary key.
    - ``title``: The title of the rule (or `None` if not specified).
    - ``description``: The description of the rule (or `None` if not specified).
    - ``user_id``: The user ID.
    - ``trigger_id``: The trigger ID.
    - ``triggerToken``: The trigger token (or `None` if not specified).
    - ``action_id``: The action ID.
    - ``actionToken``: The action token (or `None` if not specified).
    - ``created_at``: The creation timestamp in the format 'YYYY-MM-DD HH:MM:SS'.
