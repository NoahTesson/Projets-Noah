from django.db import models

class ResetPassword(models.Model):
    """
    Model for storing reset password tokens.
    """
    id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'resetPassword'

    def to_dict(self) -> dict:
        """
        Convert the ResetPassword object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict
        """
        return {
            "id": self.id,
            "user_id": self.user_id,
            "token": self.token,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
