from django.db import models

class TokensModel(models.Model):
    """
    Model for storing user tokens for various services.
    """
    user_id = models.IntegerField(primary_key=True)
    googleToken = models.CharField(max_length=255, null=True)
    twitterToken = models.CharField(max_length=255, null=True)
    githubToken = models.CharField(max_length=255, null=True)
    discordToken = models.CharField(max_length=255, null=True)
    spotifyToken = models.CharField(max_length=500, null=True)
    linkedinToken = models.CharField(max_length=500, null=True)
    trelloToken = models.CharField(max_length=500, null=True)

    class Meta:
        db_table = 'tokens'

    def to_dict(self) -> dict:
        """
        Convert the TokensModel object to a dictionary.

        :return: A dictionary containing the object's attributes.
        :rtype: dict
        """
        return {
            'user_id': self.user_id,
            'googleToken': self.googleToken,
            'twitterToken': self.twitterToken,
            'githubToken': self.githubToken,
            'discordToken': self.discordToken,
            'spotifyToken': self.spotifyToken,
        }