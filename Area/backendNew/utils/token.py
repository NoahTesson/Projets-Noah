import random
from datetime import datetime, timedelta, timezone
from backendNew.models.user_token import UserToken

chars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

def generateToken(size = 32, indexes = [7, 11, 15, 19]) -> str:
    """
    This function generates a random token, with the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx.

    :param size: The size of the token. 32 by default.
    :param indexes: The indexes of the '-' characters.
    :return: The generated token.
    """
    token: str = ''
    i = -1
    while len(token) != size:
        i += 1
        token = token + random.choice(chars)
        if i in indexes:
            token = token + '-'
            continue
    return token

def check_token(token, minutes=30) -> bool:
    """
    This function checks if the token has been generated less than 30 minutes ago.

    :param token: The token to check.
    :param minutes: The number of minutes you want the token to be valid.
    :return: True if the token has been generated less than 30 minutes ago, False otherwise.
    """
    actual_time = datetime.now(timezone.utc)
    if (actual_time - token.created_at) < timedelta(minutes=minutes):
        return True
    else:
        return False


def analyseToken(request) -> UserToken | None:
    """
    This function gets the 'X-Authorization-Key' from the request headers and checks its validity.

    :param request: the Http request object.
    :return: the UserToken if the given token is valid, None otherwise.
    """
    token = request.headers.get("X-Authorization-Key")
    if token is not None:
        if (db_token := UserToken.objects.filter(token=token).first()):
            if check_token(db_token):
                return db_token
    return None
