from django.db import models

class RuleModel(models.Model):
    """
    Model for storing reset password tokens.

    This model stores information related to reset password tokens, including the user, token, and creation timestamp.
    """
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=255, null=True)
    user_id = models.IntegerField()
    trigger_id = models.IntegerField()
    triggerToken = models.CharField(max_length=255, null=True)
    action_id = models.IntegerField()
    actionToken = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'rules'

    def to_dict(self) -> dict:
        """
        Convert the ResetPassword object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict
        """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "user_id": self.user_id,
            "trigger_id": self.trigger_id,
            "triggerToken": self.triggerToken,
            "action_id": self.action_id,
            "actionToken": self.actionToken,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
