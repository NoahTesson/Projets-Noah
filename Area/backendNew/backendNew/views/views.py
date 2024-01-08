from django.http import HttpResponse
from backendNew.models.users import UserModel
from backendNew.models.user_token import UserToken
from utils.token import generateToken, analyseToken
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import make_password, check_password
import requests
from backendNew.models.resetPassword import ResetPassword
from backendNew.models.tokens import TokensModel
import random
import string
from django.template.loader import render_to_string
from datetime import datetime, timedelta, timezone
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

@csrf_exempt
def signup(request) -> HttpResponse:
    """
    User registration endpoint.

    This view allows users to sign up by providing their name, surname, email, and password. If the email is unique, a user account is created.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's token or an error response.
    :rtype: django.http.JsonResponse
    """
    try:
        if request.method == "POST":
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            name = body['name']
            surname = body['surname']
            email = body['email']
            password = make_password(body['password'])
            if not UserModel.objects.filter(email=email):
                db_token = generateToken()
                user = UserModel.objects.create(name=name, surname=surname, email=email, password=password)
                UserToken.objects.create(token=db_token, user=user)
                return JsonResponse({"token": db_token}, status=201)
            return JsonResponse({"error": "Email already exists"}, status=400)
        else:
            return JsonResponse({"error": "Invalid method"}, status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def signin(request) -> HttpResponse:
    """
    User login endpoint.

    This view allows users to sign in by providing their email and password. If the credentials are correct, a new token is generated for the user.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's token or an error response.
    :rtype: django.http.JsonResponse
    """
    try:
        if request.method == "POST":
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            email = body['email']
            password = body['password']
            user = UserModel.objects.filter(email=email).first()
            if user and check_password(password, user.password):
                _tok = UserToken.objects.filter(user=user).first()
                if _tok is not None:
                    _tok.token = generateToken()
                    _tok.created_at = datetime.now()
                    _tok.save()
                    return JsonResponse({"token": UserToken.objects.filter(user=user).first().to_dict()['token']}, status=200)
            return JsonResponse({"error": "Invalid credentials"}, status=400)
        return JsonResponse({"error": "Invalid Methods"}, status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def singup_auth(request) -> HttpResponse:
    """
    User authentication for sign-up with an external provider.

    This view allows users to sign up using an external provider (e.g., Twitter) by providing their name, email, token, and the provider name.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's token or an error response.
    :rtype: django.http.JsonResponse
    """
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        name = body['name']
        surname = request.POST.get('surname', '')
        email = body['email']
        token = body['token']
        provider = body['provider']
        db_token = generateToken()
        if (provider == "twitter"):
            r = requests.get("https://api.twitter.com/2/users/me", headers={"Authorization": "Bearer " + token })
            if (r.status_code == 200):
                user = UserModel.objects.create(name=name, surname=surname, email=email)
                db_token = UserToken.objects.create(token=db_token, user=user)
                return JsonResponse({"token": db_token.token}, status=201)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    else :
        return JsonResponse({"error": "Invalid method"}, status=405)

@csrf_exempt
def singin_auth(request) -> HttpResponse:
    """
    User authentication for sign-in with an external provider.

    This view allows users to sign in using an external provider (e.g., Twitter) by providing their email and token.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's token or an error response.
    :rtype: django.http.JsonResponse
    """
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        email = body['email']
        token = body['token']
        provider = body['provider']
        if (provider == "twitter"):
            r = requests.get("https://api.twitter.com/2/users/me", headers={"Authorization": "Bearer " + token })
            if (r.status_code == 200):
                user = UserModel.objects.filter(email=email).first()
                if user:
                    _tok = UserToken.objects.filter(user=user).first()
                    if not _tok:
                        UserToken.objects.create(token=generateToken(), user=user)
                    else:
                        _tok.token = generateToken()
                        _tok.created_at = datetime.now()
                        _tok.save()
                    return JsonResponse({"token": _tok.token}, status=201)
                return JsonResponse({"error": "Invalid credentials"}, status=400)
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    else :
        return JsonResponse({"error": "Invalid method"}, status=405)

@csrf_exempt
def user_exists(request) -> HttpResponse:
    """
    Check if a user exists based on their email.

    This view checks if a user exists in the database based on their email.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's details or an error response.
    :rtype: django.http.HttpResponse
    """
    try:
        if request.method == "POST":
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            email = body['email']
            user = UserModel.objects.filter(email=email).first()
            if user:
                return HttpResponse(json.dumps(user.to_dict()), status=200)
            return JsonResponse({"error": "Invalid credentials"}, status=400)
        return JsonResponse({"error": "Invalid method"}, status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)


def generate_hash() -> str:
    """
    Generate a random string hash.

    This function generates a random string hash of variable length between 20 and 25 characters.

    :return: A random string hash.
    :rtype: str
    """
    longueur = random.randint(20, 25)
    caracteres = string.ascii_letters + string.digits
    return ''.join(random.choice(caracteres) for _ in range(longueur))


@csrf_exempt
def sendMail(request) -> HttpResponse:
    """
    Send a password reset email.

    This view sends a password reset email to the user's email address.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response indicating success or an error response.
    :rtype: django.http.JsonResponse
    """
    try:
        if request.method == "POST":
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            email = body['email']
            db_token = UserToken.objects.filter(user__email=email).first()
            user = UserModel.objects.filter(id=db_token.user.to_dict()['id']).first().to_dict()
            token = generate_hash()
            rst = ResetPassword(user_id=user['id'], token=token)
            rst.save()
            html_message = render_to_string('resetPassword.html', {'token': token})
            plain_message = strip_tags(html_message)
            message = EmailMultiAlternatives(
                subject = "[NAPTE] Réinitialisation de votre mot de passe",
                body = plain_message,
                from_email =  "napte.epitech@outlook.com" ,
                to = [user['email']]
            )
            message.attach_alternative(html_message, "text/html")
            message.send()
            return JsonResponse({"success": "Mail sent"}, status=200)
        return JsonResponse({"error": "Invalid method"}, status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)


@csrf_exempt
def resetPassword(request, token) -> HttpResponse:
    """
    Reset the user's password.

    This view resets the user's password based on a provided token.

    :param request: Django request object.
    :type request: django.http.HttpRequest
    :param token: Reset password token.
    :type token: str

    :return: JSON response indicating success or an error response.
    :rtype: django.http.JsonResponse
    """
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        password = body['password']
        user_id = ResetPassword.objects.filter(token=token).first().to_dict()['user_id']
        password = make_password(body['password'])
        _pass = ResetPassword.objects.filter(user_id=user_id, token=token).first()
        if _pass:
            current_time = datetime.now(timezone.utc)
            time_difference = current_time - _pass.created_at
            if time_difference > timedelta(minutes=30):
                return JsonResponse({"error": "Token expired"}, status=400)
            user = UserModel.objects.filter(id=user_id).first()
            user.password = password
            user.save()
            _pass.delete()
            return JsonResponse({"succes": "Password changed"}, status=200)
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def isTokenValid(request) -> HttpResponse:
    """
    Check if the user's authentication token is valid.

    This view checks if the user's authentication token is valid for the given provider (e.g., Twitter or Google).

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's details or an error response.
    :rtype: django.http.HttpResponse
    """
    if request.method == "POST":
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        email = db_token.user.to_dict()['email']
        provider = body['provider']
        users = UserModel.objects.filter(email=email)
        if not users:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
        user_id = users.first().to_dict()['id']
        tokens = TokensModel.objects.filter(user_id=user_id)
        if not tokens:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
        token = tokens.first().to_dict()
        if (provider == "twitter"):
            r = requests.get("https://api.twitter.com/2/users/me", headers={"Authorization": "Bearer " + token["twitterToken"] })
            if (r.status_code == 200):
                user = UserModel.objects.filter(email=email).first()
                if user:
                    return HttpResponse(json.dumps(user.to_dict()), status=200)
                return JsonResponse({"error": "Invalid credentials"}, status=400)
            return JsonResponse({"error": "Invalid credentials"}, status=400)
        elif (provider == "google"):
            r = requests.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", headers={
                'Authorization': f'Bearer {token["googleToken"]}',
                'Content-Type': 'application/json',
            })
            if (r.status_code == 200):
                user = UserModel.objects.filter(email=email).first()
                if user:
                    return HttpResponse(json.dumps(user.to_dict()), status=200)
                return JsonResponse({"error": "Invalid credentials"}, status=400)
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    else :
        return JsonResponse({"error": "Invalid method"}, status=405)

@csrf_exempt
def me(request) -> HttpResponse:
    """
    Get the user's profile details.

    This view returns the profile details of the authenticated user.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the user's profile details or an error response.
    :rtype: django.http.HttpResponse
    """
    if request.method == "GET":
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        return HttpResponse(json.dumps(db_token.user.to_dict()), status=200)
    else:
        return JsonResponse({"error": "Invalid method"}, status=405)