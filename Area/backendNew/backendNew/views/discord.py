from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backendNew.models.users import UserModel
from backendNew.models.user_token import UserToken
from backendNew.models.tokens import TokensModel
import json
import requests
from backendNew.views.checkForReactions import checkForReactions
from django.shortcuts import redirect
from utils.token import generateToken, analyseToken
import datetime
import os

@csrf_exempt
def login(request):
    """
    Redirects the user to the Discord OAuth login page.

    :return: Redirect response to the Discord OAuth login page.
    :rtype: django.shortcuts.redirect
    """
    url = f'https://discord.com/oauth2/authorize?response_type=code&client_id={os.getenv("DISCORD_CLIENT_ID")}&scope={os.getenv("DISCORD_SCOPE")}&redirect_uri={os.getenv("DISCORD_REDIRECT_URI")}&prompt=consent'
    return redirect(url)


@csrf_exempt
def login_profile(request):
    """
    Redirects the user to the Discord OAuth login page for profile data.

    :return: Redirect response to the Discord OAuth login page for profile data.
    :rtype: django.shortcuts.redirect
    """
    url = f'https://discord.com/oauth2/authorize?response_type=code&client_id={os.getenv("DISCORD_CLIENT_ID")}&scope={os.getenv("DISCORD_SCOPE")}&redirect_uri={os.getenv("DISCORD_REDIRECT_URI")}_profile&prompt=consent'
    return redirect(url)

@csrf_exempt
def callback(request):
    """
    Handles the callback after a user logs in via Discord OAuth.

    :return: Redirect response to the client with an access token.
    :rtype: django.shortcuts.redirect
    """
    code = request.GET.get('code', None)
    r = requests.post('https://discord.com/api/oauth2/token', data={
        'client_id': os.getenv("DISCORD_CLIENT_ID"),
        'client_secret': os.getenv("DISCORD_CLIENT_SECRET"),
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': os.getenv("DISCORD_REDIRECT_URI"),
        'scope': os.getenv("DISCORD_SCOPE")
    })
    data = r.json()
    access_token = data['access_token']
    r = requests.get('https://discord.com/api/users/@me', headers={
        'Authorization': f'Bearer {access_token}'
    })
    data = r.json()
    name = data['global_name']
    username = data['username']
    email = data['email']
    if UserModel.objects.filter(email=email).first() is None:
        UserModel.objects.create(name=name, surname=username, email=email)
        UserToken.objects.create(user=UserModel.objects.filter(email=email).first(), token=generateToken())
        TokensModel.objects.create(user_id=UserModel.objects.filter(email=email).first().to_dict()['id'], discordToken=access_token)
    else:
        napteToken = UserToken.objects.filter(user=UserModel.objects.filter(email=email).first()).first()
        napteToken.token = generateToken()
        napteToken.created_at = datetime.datetime.now()
        napteToken.save()
        if TokensModel.objects.filter(user_id=UserModel.objects.filter(email=email).first().to_dict()['id']).first() is None:
            TokensModel.objects.create(user_id=UserModel.objects.filter(email=email).first().to_dict()['id'], discordToken=access_token)
        else:
            token = TokensModel.objects.filter(user_id=UserModel.objects.filter(email=email).first().to_dict()['id']).first()
            token.discordToken = access_token
            token.save()
        pass
    return redirect(f"http://localhost:8081?token={UserToken.objects.filter(user=UserModel.objects.filter(email=email).first()).first().to_dict()['token']}", status=200)

@csrf_exempt
def callback_profile(request):
    """
    Handles the callback for profile data after a user logs in via Discord OAuth.

    :return: Redirect response to the client with an access token.
    :rtype: django.shortcuts.redirect
    """
    code = request.GET.get('code', None)
    r = requests.post('https://discord.com/api/oauth2/token', data={
        'client_id': os.getenv("DISCORD_CLIENT_ID"),
        'client_secret': os.getenv("DISCORD_CLIENT_SECRET"),
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': f'{os.getenv("DISCORD_REDIRECT_URI")}_profile',
        'scope': os.getenv("DISCORD_SCOPE")
    })
    data = r.json()
    access_token = data['access_token']
    return redirect(f"http://localhost:8081?token={access_token}", status=200)

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Sets or updates a Discord token for the user.

    :return: JSON response with the token information or an error response.
    :rtype: django.http.HttpResponse
    """
    try:
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        if request.method != 'POST':
            return JsonResponse({'error': 'Invalid Methods'}, content_type='application/json', status=405)
        data = request.body
        data = json.loads(data)
        token = data['token']
        user_id = db_token.user.id
        if not TokensModel.objects.filter(user_id=user_id):
            thisToken = TokensModel(user_id=user_id, discordToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.discordToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def getGuilds(request) -> HttpResponse:
    """
    Gets the guilds (servers) the user is a member of.

    :return: JSON response with the list of guilds or an error response.
    :rtype: django.http.HttpResponse
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    user = db_token.user
    access_token = TokensModel.objects.filter(user_id=user.to_dict()['id']).first().to_dict()['discordToken']
    r = requests.get(f"https://discord.com/api/users/@me/guilds", headers={
        'Authorization': f'Bearer {access_token}'
    })
    if r.status_code == 200:
        r = r.json()
        discord_servers = [{'name': server['name'], 'id': server['id']} for server in r]
        return HttpResponse(json.dumps(discord_servers), status=200)
    return HttpResponse(json.dumps(r.json()), status=r.status_code)

@csrf_exempt
def updateStatus(request) -> HttpResponse:
    """
    Handles the user's status update event.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        new_status = data['new_status']
        prev_status = data['prev_status']
        user = data['user']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When an user update his status", f'{user} has change his status from {prev_status} to {new_status}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def userTyping(request) -> HttpResponse:
    """
    Handles the user typing event in a channel.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        user = data['user']
        channel = data['channel']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When an user is typing", f'[{guild}]: {user} is typping on channel: {channel}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def userJoin(request) -> HttpResponse:
    """
    Handles the user joining a server event.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        user = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When an user join the server", f'{user} has join {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def userRemove(request) -> HttpResponse:
    """
    Handles the user being removed from a server event.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        user = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When an user is remove from the server", f'{user} has been removed {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def userBan(request) -> HttpResponse:
    """
    Handles the user being banned from a server event.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        user = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When an user is ban from the server", f'{user} has been banned {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def userUnban(request) -> HttpResponse:
    """
    Handles the user being unbanned from a server event.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        user = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When an user is unban from the server", f'{user} has been unbanned {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def messageChannel(request) -> HttpResponse:
    """
    Handles the event of a message being sent to a channel.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        channel = data['channel']
        author = data['author']
        guild = data['guild']
        content = data['content']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When a message is send on the server", f'"{content}" have been send in {channel}-{guild} by {author}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def channelCreate(request) -> HttpResponse:
    """
    Handles the event of a new channel being created.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        name = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When a channel is created", f'A new channel: {name} have been created in {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def channelUpdate(request) -> HttpResponse:
    """
    Handles the event of an existing channel being updated.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        name = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When a channel is updated", f'Channel: {name} have been updated in {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def channelDelete(request) -> HttpResponse:
    """
    Handles the event of a channel being deleted.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        name = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When a channel is deleted", f'Channel: {name} have been deleted in {guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def pinsUpdate(request) -> HttpResponse:
    """
    Handles the event of a message being pinned in a channel.

    :return: A redirection to a reaction path or a success response.
    :rtype: django.shortcuts.redirect or django.http.HttpResponse
    """
    try:
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        name = data['name']
        guild = data['guild']
        server = request.GET.get('server', None)
        path = checkForReactions("discord", "When a message is pinned",f'A new message have been pined in {name}-{guild}', server)
        if path:
            return redirect(path)
        else:
            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)
