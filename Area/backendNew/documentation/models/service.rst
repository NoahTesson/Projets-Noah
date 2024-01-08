ServiceModel Model
==================

.. module:: backendNew.models.ServiceModel
   :platform: Any
   :synopsis: Model for storing service information.

Model
-----

.. class:: ServiceModel

    Model for storing service information.

    :param int id: The primary key for the ServiceModel instance.
    :param str name: The name of the service (max length: 80 characters, not nullable).
    :param str action: The action related to the service (max length: 80 characters, not nullable).
    :param str type: The type of the service (max length: 80 characters, not nullable).

    Meta
    ~~~~

    .. attribute:: db_table

        The database table name for the ServiceModel model.

    Methods
    ~~~~~~~~

    .. method:: to_dict()

        Convert the ServiceModel object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict

Attributes
----------

- ``id``: The primary key for the ServiceModel instance.
- ``name``: The name of the service (max length: 80 characters, not nullable).
- ``action``: The action related to the service (max length: 80 characters, not nullable).
- ``type``: The type of the service (max length: 80 characters, not nullable).

Methods
-------

- ``to_dict()``: Convert the ServiceModel object to a dictionary.

    This method returns a dictionary with the following keys:
    - ``id``: The primary key.
    - ``name``: The name of the service.
    - ``action``: The action related to the service.
    - ``type``: The type of the service.
