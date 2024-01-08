from django.db import models
from backendNew.models.users import UserModel

class UserToken(models.Model):
    """
    Model for storing user tokens associated with UserModel.
    """
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=80,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)

    class Meta:
        db_table = 'users_tokens'

    def to_dict(self) -> dict:
        """
        Convert the UserToken object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict
        """
        return {
            'id': self.id,
            'token': self.token,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'user': self.user,
        }