from django.views.decorators.csrf import csrf_exempt
import json
import requests
from backendNew.models.tokens import TokensModel
from backendNew.models.users import UserModel
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from utils.token import analyseToken
from dotenv import load_dotenv
import os

load_dotenv()

@csrf_exempt
def login(request):
    """
    Redirects the user to the Twitter authorization page for standard access.

    This view initiates the Twitter OAuth authorization flow to allow the user to grant access to their Twitter account for standard access.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: Redirects the user to the Twitter authorization page.
    :rtype: django.shortcuts.redirect
    """
    email = request.GET.get('email')
    url = f"https://twitter.com/i/oauth2/authorize?response_type=code&client_id={os.getenv('CLIENT_ID')}&redirect_uri={os.getenv('REDIRECT_URI')}&scope=tweet.read tweet.write users.read&state={email}&code_challenge=challenge&code_challenge_method=plain"
    return redirect(url)

def login_profile(request):
    """
    Redirects the user to the Twitter authorization page for profile access.

    This view initiates the Twitter OAuth authorization flow to allow the user to grant access to their Twitter account for profile access.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: Redirects the user to the Twitter authorization page.
    :rtype: django.shortcuts.redirect
    """
    email = request.GET.get('email')
    url = f"https://twitter.com/i/oauth2/authorize?response_type=code&client_id={os.getenv('CLIENT_ID')}&redirect_uri={os.getenv('REDIRECT_URI')}_profile&scope=tweet.read tweet.write users.read&state={email}&code_challenge=challenge&code_challenge_method=plain"
    return redirect(url)


#TODO: FIX CONNECTION WITH TWITTER
@csrf_exempt
def callback(request):
    """
    Handle the callback after Twitter authorization.

    This view handles the callback from Twitter after user authorization and stores the Twitter access token in the database.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: Redirects the user to the specified endpoint with the access token or returns an error response.
    :rtype: django.shortcuts.redirect or django.http.JsonResponse
    """
    if request.GET.get('error'):
        error_description = request.GET.get('error_description')
        return JsonResponse({"Error": error_description})

    authorization_code = request.GET.get('code')
    email = request.GET.get('state')
    data = {
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_uri': os.getenv('REDIRECT_URI'),
        'client_id': os.getenv('CLIENT_ID'),
        'code_verifier': "challenge",
    }

    response = requests.post('https://api.twitter.com/2/oauth2/token', data=data)
    response_data = response.json()
    if 'access_token' in response_data:
        access_token = response_data['access_token']
        resp = requests.get("https://api.twitter.com/2/users/me", headers={"Authorization": "Bearer " + access_token})
        usr = UserModel.objects.filter(email=email).first()
        if TokensModel.objects.filter(user_id=usr.id).first():
            thisToken = TokensModel.objects.filter(user_id=usr.id).first()
            thisToken.twitterToken = access_token
            thisToken.save()
        else:
            thisToken = TokensModel(user_id=usr.id, twitterToken=access_token)
            thisToken.save()
        return redirect(f"http://localhost:8081?token={access_token}", status=200)
    else:
        return JsonResponse({"error": "Failed to obtain access token"}, status=400)

@csrf_exempt
def callback_profile(request):
    """
    Handle the callback after Twitter authorization for profile access.

    This view handles the callback from Twitter after user authorization and returns the access token in the response.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: Redirects the user to the specified endpoint with the access token or returns an error response.
    :rtype: django.shortcuts.redirect or django.http.JsonResponse
    """
    if request.GET.get('error'):
        error_description = request.GET.get('error_description')
        return JsonResponse({"Error": error_description})

    authorization_code = request.GET.get('code')
    data = {
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_uri': f'{os.getenv("REDIRECT_URI")}_profile',
        'client_id': os.getenv('CLIENT_ID'),
        'code_verifier': "challenge",
    }

    response = requests.post('https://api.twitter.com/2/oauth2/token', data=data)
    response_data = response.json()
    if 'access_token' in response_data:
        access_token = response_data['access_token']
        return redirect(f"http://localhost:8081?token={access_token}", status=200)
    else:
        return JsonResponse({"error": "Failed to obtain access token"}, status=400)

@csrf_exempt
def auth(request) -> HttpResponse:
    """
    Authenticate user and obtain Twitter tokens.

    This view handles the authentication process to obtain Twitter tokens, including the access token.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the Twitter tokens and user profile information.
    :rtype: django.http.HttpResponse

    Response structure:
    {
        "tokens": {
            "access_token": "Twitter access token",
            ... (other token details)
        },
        "profile": {
            "id": "User ID",
            "username": "Username",
            ... (other profile details)
        }
    }
    """
    try:
        if request.method == "POST":
            data = request.body
            data = json.loads(data)
            access_code = data['access_code']
            redirect_uri = data['redirect_uri']
            url = 'https://api.twitter.com/2/oauth2/token'
            data = {
                'code': access_code,
                'grant_type': 'authorization_code',
                'client_id': f"{os.getenv('CLIENT_ID')}",
                'redirect_uri': f'{redirect_uri}',
                'code_verifier': 'challenge'
            }
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            response = requests.post(url, data=data, headers=headers)
            getProfile = requests.get("https://api.twitter.com/2/users/me", headers={"Authorization": "Bearer " + response.json()['access_token']})
            return HttpResponse(json.dumps({"tokens": response.json(), "profile": getProfile.json()}), status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Set and store the Twitter access token for the user.

    This view receives and stores the Twitter access token for the authenticated user in the database.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the stored Twitter access token.
    :rtype: django.http.HttpResponse

    Response structure:
    {
        "user_id": "ID of the user",
        "twitterToken": "Stored Twitter access token"
    }
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
            thisToken = TokensModel(user_id=user_id, twitterToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.twitterToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def postTweet(request) -> HttpResponse:
    """
    Post a tweet on Twitter.

    This view posts a tweet on Twitter on behalf of the user.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the tweet details or an error response.
    :rtype: django.http.HttpResponse

    Response structure:
    {
        ... (tweet details)
    }
    """
    try:
        if request.method == 'GET':
            content = request.GET.get('content', '')
            user_id = request.GET.get('user_id', '')
            token = TokensModel.objects.filter(user_id=user_id).first().to_dict()["twitterToken"]
            data = {
                "text": content,
            }
            json_data = json.dumps(data)
            r = requests.post('https://api.twitter.com/2/tweets', data=json_data,
                headers={
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            )
            if (r.status_code == 201):
                return HttpResponse(json.dumps(r.json()), content_type='application/json', status=201)
            else:
                return HttpResponse(json.dumps(r.json()), content_type='application/json', status=400)
        return JsonResponse({"error": "Invalid Method"},status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)