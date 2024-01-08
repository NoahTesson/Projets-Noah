from django.db import models

class UserModel(models.Model):
    """
    Model for storing user information.
    """
    id =  models.AutoField(primary_key=True)
    name = models.CharField(max_length=80, null=False)
    surname = models.CharField(max_length=80, null=False)
    email = models.EmailField(max_length=80, unique=True)
    password = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'

    def to_dict(self, excludePassword: bool = False) -> dict:
        """
        Convert the UserModel object to a dictionary.

        :param excludePassword: If True, the 'password' field will be excluded from the dictionary.
        :type excludePassword: bool
        :return: A dictionary containing the object's attributes.
        :rtype: dict
        """
        if excludePassword:
            return {
                'id': self.id,
                'name': self.name,
                'surname': self.surname,
                'email': self.email,
            }
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'email': self.email,
            'password': self.password
        }
