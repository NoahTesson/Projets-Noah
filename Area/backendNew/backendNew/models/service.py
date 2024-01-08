from django.db import models

class ServiceModel(models.Model):
    """
    Model for storing service information.
    """
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=80, null=False)
    action = models.CharField(max_length=80, null=False)
    type = models.CharField(max_length=80, null=False)

    class Meta:
        db_table = 'service'

    def to_dict(self) -> dict:
        """
        Convert the ServiceModel object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict
        """
        return {
            'id': self.id,
            'name': self.name,
            'action': self.action,
            'type': self.type
        }