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
from dotenv import load_dotenv
import base64

load_dotenv()

@csrf_exempt
def login(request):
    """
    Redirects the user to the Spotify OAuth login page.

    :return: Redirect response to the Spotify OAuth login page.
    :rtype: django.shortcuts.redirect
    """
    print("rd = ", os.getenv("SPOTIFY_REDIRECT_URI"))
    url = f'https://accounts.spotify.com/authorize?response_type=code&client_id={os.getenv("SPOTIFY_CLIENT_ID")}&scope={os.getenv("SPOTIFY_SCOPE")}&redirect_uri={os.getenv("SPOTIFY_REDIRECT_URI")}&state={os.getenv("SPOTIFY_STATE")}'
    return redirect(url)

@csrf_exempt
def login_profile(request):
    """
    Redirects the user to the Spotify OAuth login page for the profile.

    :return: Redirect response to the Spotify OAuth login page for the profile.
    :rtype: django.shortcuts.redirect
    """
    url = f'https://accounts.spotify.com/authorize?response_type=code&client_id={os.getenv("SPOTIFY_CLIENT_ID")}&scope={os.getenv("SPOTIFY_SCOPE")}&redirect_uri={os.getenv("SPOTIFY_REDIRECT_URI")}_profile&state={os.getenv("SPOTIFY_STATE")}'
    return redirect(url)

@csrf_exempt
def callback(request):
    """
    Handles the Spotify OAuth callback and retrieves the access token.

    :return: Redirect response with the user's access token or an error response.
    :rtype: django.shortcuts.redirect or django.http.JsonResponse
    """
    code = request.GET.get('code')
    url = f'https://accounts.spotify.com/api/token'
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': os.getenv("SPOTIFY_REDIRECT_URI"),
    }
    credentials = f"{os.getenv('SPOTIFY_CLIENT_ID')}:{os.getenv('SPOTIFY_CLIENT_SECRET')}"
    credentials_bytes = credentials.encode('utf-8')
    base64_credentials = base64.b64encode(credentials_bytes).decode('utf-8')
    headers= {
        'Authorization': 'Basic ' + base64_credentials
    }
    response = requests.post(url, data=data, headers=headers)
    response = response.json()
    access_token = response['access_token']
    r = requests.get('https://api.spotify.com/v1/me', headers={'Authorization': f'Bearer {access_token}'})
    name = r.json()['display_name']
    email = r.json()['email']
    if UserModel.objects.filter(email=email).first() is None:
        UserModel.objects.create(name=name, email=email)
        UserToken.objects.create(user=UserModel.objects.filter(email=email).first(), token=generateToken())
        TokensModel.objects.create(user_id=UserModel.objects.filter(email=email).first().to_dict()['id'], spotifyToken=access_token)
    else:
        napteToken = UserToken.objects.filter(user=UserModel.objects.filter(email=email).first()).first()
        napteToken.token = generateToken()
        napteToken.created_at = datetime.datetime.now()
        napteToken.save()
        if (TokensModel.objects.filter(user_id=UserModel.objects.filter(email=email).first().to_dict()['id']).first() is None):
            TokensModel.objects.create(user_id=UserModel.objects.filter(email=email).first().to_dict()['id'], spotifyToken=access_token)
        token = TokensModel.objects.filter(user_id=UserModel.objects.filter(email=email).first().to_dict()['id']).first()
        token.spotifyToken = access_token
        token.save()
        pass
    return redirect(f"http://localhost:8081?token={UserToken.objects.filter(user=UserModel.objects.filter(email=email).first()).first().to_dict()['token']}", status=200)

@csrf_exempt
def callback_profile(request):
    """
    Handles the Spotify OAuth callback for the profile and retrieves the access token.

    :return: Redirect response with the user's access token or an error response.
    :rtype: django.shortcuts.redirect or django.http.JsonResponse
    """
    code = request.GET.get('code')
    url = f'https://accounts.spotify.com/api/token'
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': f'{os.getenv("SPOTIFY_REDIRECT_URI")}_profile',
    }
    credentials = f"{os.getenv('SPOTIFY_CLIENT_ID')}:{os.getenv('SPOTIFY_CLIENT_SECRET')}"
    credentials_bytes = credentials.encode('utf-8')
    base64_credentials = base64.b64encode(credentials_bytes).decode('utf-8')
    headers= {
        'Authorization': 'Basic ' + base64_credentials
    }
    response = requests.post(url, data=data, headers=headers)
    print(response.json())
    response = response.json()
    access_token = response['access_token']
    return redirect(f"http://localhost:8081?token={access_token}", status=200)

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Sets or updates a Spotify token for the user.

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
            thisToken = TokensModel(user_id=user_id, spotifyToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.spotifyToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)


@csrf_exempt
def follow_playlist(request) -> HttpResponse:
    """
    Follows a Spotify playlist on behalf of the user.

    :return: HTTP response with success or error status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            data = request.GET.get('playlist_id', None)
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            url = f"https://api.spotify.com/v1/playlists/{data}/followers"
            headers = {
                'Authorization': f'Bearer {token}',
            }

            response = requests.put(url, headers=headers)
            if (response.status_code != 200):
                return HttpResponse(status=500)
            return HttpResponse(status=200)
        except Exception as e:
            print(f"Une erreur s'est produite : {str(e)}")
            return HttpResponse(status=500)

@csrf_exempt
def unfollow_playlist(request) -> HttpResponse:
    """
    Unfollows a Spotify playlist on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            data = request.GET.get('playlist_id', None)
            url = f"https://api.spotify.com/v1/playlists/{data}/followers"
            headers = {
                'Authorization': f'Bearer {token}',
            }
            response = requests.delete(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            print(f"Une erreur s'est produite : {str(e)}")
            return HttpResponse(status=500)

@csrf_exempt
def follow_artist(request) -> HttpResponse:
    """
    Follows a Spotify artist on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            artist_id = request.GET.get('artist_id', None)
            url = f"https://api.spotify.com/v1/me/following?type=artist&ids={artist_id}"
            headers = {
                'Authorization': f'Bearer {token}',
            }

            response = requests.put(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)

@csrf_exempt
def unfollow_artist(request) -> HttpResponse:
    """
    Unfollows a Spotify artist on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            artist_id = request.GET.get('artist_id', None)
            url = f"https://api.spotify.com/v1/me/following?type=artist&ids={artist_id}"
            headers = {
                'Authorization': f'Bearer {token}',
            }

            response = requests.delete(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)

@csrf_exempt
def follow_user(request) -> HttpResponse:
    """
    Follows a Spotify user on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            user_id = request.GET.get('user_id', None)
            url = f"https://api.spotify.com/v1/me/following?type=user&ids={user_id}"
            headers = {
                'Authorization': f'Bearer {token}',
            }

            response = requests.put(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)

@csrf_exempt
def unfollow_user(request) -> HttpResponse:
    """
    Unfollows a Spotify user on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            user_id = request.GET.get('user_id', None)
            url = f"https://api.spotify.com/v1/me/following?type=user&ids={user_id}"
            headers = {
                'Authorization': f'Bearer {token}',
            }
            response = requests.delete(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)

@csrf_exempt
def save_track(request) -> HttpResponse:
    """
    Saves a Spotify track on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            track_id = request.GET.get('track_id', None)
            url = f"https://api.spotify.com/v1/me/tracks?ids={track_id}"
            headers = {
                'Authorization': f'Bearer {token}',
            }
            response = requests.put(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)

@csrf_exempt
def unsave_track(request) -> HttpResponse:
    """
    Unsaves a Spotify track on behalf of the user.

    :return: HTTP response with success status code.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        try:
            user_id = request.GET.get('user_id', None)
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()['spotifyToken']
            track_id = request.GET.get('track_id', None)
            url = f"https://api.spotify.com/v1/me/tracks?ids={track_id}"
            headers = {
                'Authorization': f'Bearer {token}',
            }
            response = requests.delete(url, headers=headers)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=500)
