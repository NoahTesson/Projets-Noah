from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import requests
import json
from urllib.parse import parse_qs
from backendNew.models.users import UserModel
from backendNew.models.tokens import TokensModel
from dotenv import load_dotenv
import os
from utils.token import analyseToken, generateToken
from backendNew.models.user_token import UserToken
import datetime

load_dotenv()

@csrf_exempt
def login(request):
    """
    Redirects the user to the GitHub OAuth login page.

    :return: Redirect response to the GitHub OAuth login page.
    :rtype: django.shortcuts.redirect
    """
    my_redirect = f"{os.getenv('GITHUB_REDIRECT_URI')}/redirectToRoot"
    url = f"https://github.com/login/oauth/authorize?client_id={os.getenv('GITHUB_CLIENT_ID')}&redirect_uri={my_redirect}&scope=user:email, repo, delete_repo"
    return redirect(url)

@csrf_exempt
def login_profile(request):
    """
    Redirects the user to the GitHub OAuth login page for profile data.

    :return: Redirect response to the GitHub OAuth login page for profile data.
    :rtype: django.shortcuts.redirect
    """
    my_redirect = f"{os.getenv('GITHUB_REDIRECT_URI')}/callback_profile"
    url = f"https://github.com/login/oauth/authorize?client_id={os.getenv('GITHUB_CLIENT_ID')}&redirect_uri={my_redirect}&scope=user:email, repo, delete_repo"
    return redirect(url)

@csrf_exempt
def getUser(request) -> HttpResponse:
    """
    Retrieves user data from GitHub.

    :return: JSON response with user data or an error response.
    :rtype: django.http.HttpResponse
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    if request.method == 'GET':
        usr = db_token.user
        if (usr):
            usr_id = usr.to_dict()["id"]
            token = TokensModel.objects.filter(user_id=usr_id).first()
            if token is not None:
                access_token = token.to_dict()["githubToken"]
                headers = {'Authorization': f'token {access_token}'}
                user_data = requests.get('https://api.github.com/user', headers=headers).json()
                return JsonResponse(user_data, status=200)
            return JsonResponse({"error": "User not connected to github"}, status=404)
        return JsonResponse({"error": "User not found"}, status=404)
    return JsonResponse({"error": "Bad request method"}, status=405)

@csrf_exempt
def redirectToRoot(request):
    """
    Handles the GitHub OAuth callback and redirects to the root page.

    :return: Redirect response with the user's access token.
    :rtype: django.shortcuts.redirect
    """
    code = request.GET.get('code', None)
    if code:
        response = requests.post('https://github.com/login/oauth/access_token', data={
            'client_id': os.getenv('GITHUB_CLIENT_ID'),
            'client_secret': os.getenv('GITHUB_CLIENT_SECRET'),
            'code': code,
        })
        if response.status_code == 200:
            response_data = parse_qs(response.text)
            access_token = response_data.get('access_token', [None])[0]
            if access_token:
                print("accesToken OK")
                headers = {'Authorization': f'token {access_token}'}
                user_data = requests.get('https://api.github.com/user', headers=headers).json()
                email = requests.get('https://api.github.com/user/emails', headers=headers).json()[0]['email']
                usr = UserModel.objects.filter(email=email).first()
                print(user_data)
                if usr is None:
                    usr = UserModel.objects.create(name=user_data['login'], email=email)
                if TokensModel.objects.filter(user_id=usr.to_dict()['id']).first() is None:
                    TokensModel.objects.create(user_id=UserModel.objects.filter(email=email).first().to_dict()['id'], githubToken=access_token)
                else:
                    token = TokensModel.objects.filter(user_id=UserModel.objects.filter(email=email).first().to_dict()['id']).first()
                    token.githubToken = access_token
                    token.save()
                if UserModel.objects.filter(email=email).first():
                    usr = UserModel.objects.filter(email=email).first()
                else:
                    usr = UserModel(name=user_data['login'], email=email)
                    usr.save()
                _tok = UserToken.objects.filter(user=usr).first()
                if not _tok:
                    napteToken = UserToken.objects.create(token=generateToken(), user=usr)
                    return redirect(f"http://localhost:8081?token={napteToken.to_dict()['token']}", status=200)
                else:
                    _tok.token = generateToken()
                    _tok.created_at = datetime.datetime.now()
                    _tok.save()
                    return redirect(f"http://localhost:8081?token={UserToken.objects.filter(user=usr).first().to_dict()['token']}", status=200)

@csrf_exempt
def callback_profile(request):
    """
    Handles the GitHub OAuth callback for profile data and redirects to the client with an access token.

    :return: Redirect response with the user's access token.
    :rtype: django.shortcuts.redirect
    """
    code = request.GET.get('code', None)
    if code:
        response = requests.post('https://github.com/login/oauth/access_token', data={
            'client_id': os.getenv('GITHUB_CLIENT_ID'),
            'client_secret': os.getenv('GITHUB_CLIENT_SECRET'),
            'code': code,
        })
        if response.status_code == 200:
            response_data = parse_qs(response.text)
            access_token = response_data.get('access_token', [None])[0]
            if access_token:
                return redirect(f"http://localhost:8081?token={access_token}", status=200)
        return redirect(f"http://localhost:8081?token={access_token}", status=response.status_code)
    return HttpResponse(status=500)

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Sets or updates a GitHub token for the user.

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
            thisToken = TokensModel(user_id=user_id, githubToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.githubToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def createRepo(request) -> HttpResponse:
    """
    Creates a new GitHub repository for the user.

    :return: JSON response with the repository creation status or an error response.
    :rtype: django.http.HttpResponse
    """
    if request.method == "GET":
        user_id = request.GET.get('user_id')
        token = TokensModel.objects.filter(user_id=user_id).first()
        if token is not None:
            token = token.githubToken
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

        name = request.GET.get('repo_name', None)
        desc = request.GET.get('repo_desc', "this is a default description")
        visibility = request.GET.get('is_repo_private', True) == '1'
        resp = requests.post("https://api.github.com/user/repos", headers={
            "Accept": "application/vnd.github.v3+json",
            "Authorization": f'token {token}',
        }, json={
            "name": name,
            "description": desc,
            'private': visibility
        })
        if resp.status_code == 422:
            return JsonResponse({'msg': f'repository {name} already exists'}, status=resp.status_code)
        elif resp.status_code == 201:
            return JsonResponse({'msg': f'repository {name} created'}, status=resp.status_code)
        return HttpResponse(status=401)
    return JsonResponse({'error': "Invalid Method"}, status=405)

@csrf_exempt
def deleteRepo(request) -> HttpResponse:
    """
    Deletes a GitHub repository for the user.

    :return: JSON response with the repository deletion status or an error response.
    :rtype: django.http.HttpResponse
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    if request.method == 'DELETE':
        token = TokensModel.objects.filter(user_id=db_token.user_id).first()
        if token is not None:
            token = token.githubToken
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        body = json.loads(request.body.decode('utf-8'))
        owner = body['owner']
        repo_name = body['repository_name']
        resp = requests.delete(f'https://api.github.com/repos/{owner}/{repo_name}', headers={
            "Accept": "application/vnd.github.v3+json",
            "Authorization": f'token {token}',
        })
        if resp.status_code == 403:
            return JsonResponse({'msg': 'You are not authorized to access this repository'}, status=resp.status_code)
        if resp.status_code == 200:
            return JsonResponse({'msg': f'Repository {repo_name} deleted'}, status=200)
        return HttpResponse(status=resp.status_code)
    return HttpResponse({'error': "Invalid Method"}, status=405)

@csrf_exempt
def getListRepo(request) -> HttpResponse:
    """
    Retrieves a list of GitHub repositories for the specified user.

    :return: JSON response with the list of repositories or an error response.
    :rtype: django.http.HttpResponse
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    if request.method == 'GET':
        username = request.GET.get('username', None)
        if username is None:
            return JsonResponse({"error": "Invalid username"}, status=403)
        token = TokensModel.objects.filter(user_id=db_token.user_id).first()
        if token is not None:
            token = token.githubToken
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

        resp = requests.get(f"https://api.github.com/users/{username}/repos", headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28"
        })
        return HttpResponse(resp.text, status=200)
    return HttpResponse(status=200)