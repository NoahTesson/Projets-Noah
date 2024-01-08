from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from backendNew.models.tokens import TokensModel
from backendNew.models.users import UserModel
import json
import requests
from django.http import JsonResponse
from django.shortcuts import redirect
from dotenv import load_dotenv
import os
from utils.token import analyseToken, generateToken
from backendNew.models.user_token import UserToken
import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

load_dotenv()

@csrf_exempt
def login(request):
    """
    Redirects the user to the Google OAuth login page based on the device type.

    :return: Redirect response to the Google OAuth login page.
    :rtype: django.shortcuts.redirect
    """
    device = request.GET.get('device')
    if device == "angular":
        url = f"https://accounts.google.com/o/oauth2/auth?client_id={os.getenv('GOOGLE_CLIENT_ID')}&redirect_uri={os.getenv('GOOGLE_REDIRECT_URI')}/api/google/redirectToRoot&response_type=code&scope=https://www.googleapis.com/auth/profile.emails.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar&access_type=offline"
        return redirect(url)
    else:
        url = f"https://accounts.google.com/o/oauth2/auth?client_id={os.getenv('GOOGLE_CLIENT_ID')}&redirect_uri={os.getenv('GOOGLE_REDIRECT_URI')}/api/google/callback&response_type=code&scope=https://www.googleapis.com/auth/profile.emails.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar&access_type=offline"
        return redirect(url)

@csrf_exempt
def login_profile(request):
    """
    Redirects the user to the Google OAuth login page for profile data.

    :return: Redirect response to the Google OAuth login page for profile data.
    :rtype: django.shortcuts.redirect
    """
    url = f"https://accounts.google.com/o/oauth2/auth?client_id={os.getenv('GOOGLE_CLIENT_ID')}&redirect_uri={os.getenv('GOOGLE_REDIRECT_URI')}/api/google/callback_profile&response_type=code&scope=https://www.googleapis.com/auth/profile.emails.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar&access_type=offline"
    return redirect(url)

@csrf_exempt
def callback(request):
    """
    Handles the Google OAuth callback and redirects to the client with an access token.

    :return: Redirect response with the user's access token.
    :rtype: django.shortcuts.redirect
    """
    r = requests.post('https://oauth2.googleapis.com/token', data={
        'code': request.GET.get('code'),
        'client_id': {os.getenv('GOOGLE_CLIENT_ID')},
        'client_secret': {os.getenv('GOOGLE_CLIENT_SECRET')},
        'redirect_uri': f"{os.getenv('GOOGLE_REDIRECT_URI')}/api/google/callback",
        'grant_type': 'authorization_code'
    })
    resp = requests.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
        headers={
            'Authorization': f"Bearer {r.json()['access_token']}",
        })
    name = resp.json()['names'][0]['displayName']
    email = resp.json()['emailAddresses'][0]['value']
    if not UserModel.objects.filter(email=email):
        thisUser = UserModel.objects.create(name=name, email=email)
        TokensModel.objects.create(user_id=thisUser.to_dict()['id'], googleToken=r.json()['access_token'])
        thisUser.save()
    else:
        thisUser = UserModel.objects.filter(email=email).first()
        _tok = TokensModel.objects.filter(user_id=thisUser.to_dict()['id']).first()
        if not _tok:
            TokensModel.objects.create(user_id=thisUser.to_dict()['id'], googleToken=r.json()['access_token'])
        else:
            _tok.googleToken = r.json()['access_token']
            _tok.save()
    _tok = UserToken.objects.filter(user=thisUser).first()
    if not _tok:
        UserToken.objects.create(token=generateToken(), user=thisUser)
    else:
        _tok.token = generateToken()
        _tok.created_at = datetime.datetime.now()
        _tok.save()
    return redirect(f"http://localhost:8081?token={UserToken.objects.filter(user=thisUser).first().to_dict()['token']}", status=200)

@csrf_exempt
def callback_profile(request):
    """
    Handles the Google OAuth callback for profile data and redirects to the client with an access token.

    :return: Redirect response with the user's access token.
    :rtype: django.shortcuts.redirect
    """
    r = requests.post('https://oauth2.googleapis.com/token', data={
        'code': request.GET.get('code'),
        'client_id': {os.getenv('GOOGLE_CLIENT_ID')},
        'client_secret': {os.getenv('GOOGLE_CLIENT_SECRET')},
        'redirect_uri': f"{os.getenv('GOOGLE_REDIRECT_URI')}/api/google/callback_profile",
        'grant_type': 'authorization_code'
    })
    print("==============================")
    print(r.json()['access_token'])
    return redirect(f"http://localhost:8081?token={r.json()['access_token']}", status=200)


@csrf_exempt
def redirectToRoot(request):
    """
    Handles the Google OAuth callback and redirects to the client with an access token.

    :return: Redirect response with the user's access token.
    :rtype: django.shortcuts.redirect
    """
    r = requests.post('https://oauth2.googleapis.com/token', data={
        'code': request.GET.get('code'),
        'client_id': {os.getenv('GOOGLE_CLIENT_ID')},
        'client_secret': {os.getenv('GOOGLE_CLIENT_SECRET')},
        'redirect_uri': f"{os.getenv('GOOGLE_REDIRECT_URI')}/api/google/redirectToRoot",
        'grant_type': 'authorization_code'
    })
    resp = requests.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses',
        headers={
            'Authorization': f"Bearer {r.json()['access_token']}",
        })
    name = resp.json()['names'][0]['displayName']
    email = resp.json()['emailAddresses'][0]['value']
    if not UserModel.objects.filter(email=email):
        thisUser = UserModel(name=name, email=email)
        TokensModel.objects.create(user_id=thisUser.to_dict()['id'], googleToken=r.json()['access_token'])
        thisUser.save()
    else:
        thisUser = UserModel.objects.filter(email=email).first()
        _tok = TokensModel.objects.filter(user_id=thisUser.to_dict()['id']).first()
        if not _tok:
            TokensModel.objects.create(user_id=thisUser.to_dict()['id'], googleToken=r.json()['access_token'])
        else:
            _tok.googleToken = r.json()['access_token']
            _tok.save()
    _tok = UserToken.objects.filter(user=thisUser).first()
    if not _tok:
        UserToken.objects.create(token=generateToken(), user=thisUser)
    else:
        _tok.token = generateToken()
        _tok.created_at = datetime.datetime.now()
        _tok.save()
    return redirect(f"http://localhost:8081?token={UserToken.objects.filter(user=thisUser).first().to_dict()['token']}", status=200)

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Sets or updates a Google token for the user.

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
        user_id = db_token.user.to_dict()['id']
        print(user_id)
        if not TokensModel.objects.filter(user_id=user_id):
            thisToken = TokensModel(user_id=user_id, googleToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.googleToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)


@csrf_exempt
def getAllCalendar(request) -> HttpResponse:
    """
    Retrieves the user's Google Calendar data.

    :return: JSON response with the Google Calendar data or an error response.
    :rtype: django.http.HttpResponse
    """
    try :
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        user_id = db_token.user.to_dict()['id']
        tokens = TokensModel.objects.filter(user_id=user_id).first()
        if tokens is not None:
            googleToken = tokens.to_dict()["googleToken"]
            if googleToken is not None:
                r = requests.get('https://www.googleapis.com/calendar/v3/users/me/calendarList/', headers={'Authorization': 'Bearer '+ googleToken})
                print(r)
                return HttpResponse(json.dumps(r.json()), content_type='application/json', status=200)
        return JsonResponse({"error": "User is not connected to google"}, status=400)
    except Exception as e:
        return HttpResponse(str(e), status=500)

def create_file(title, googleToken):
    """
    Creates a Google Drive file with the specified title.

    :param title: The title of the file.
    :type title: str
    :param googleToken: The user's Google token.
    :type googleToken: str

    :return: The ID of the created Google Drive file.
    :rtype: str
    """
    spreadsheet_data = {
        'properties': {
            'title': title
        }
    }
    response = requests.post('https://sheets.googleapis.com/v4/spreadsheets', json=spreadsheet_data, headers={
        'Authorization': f'Bearer {googleToken}',
        'Content-Type': 'application/json',
    })
    _id = response.json()['spreadsheetId']
    return _id

@csrf_exempt
def add_new_row(request) -> HttpResponse:
    """
    Adds a new row to a Google Sheets document.

    :return: JSON response with a success message or an error response.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        user_id = request.GET.get('user_id', None)
        title = request.GET.get('title', "Area")
        value1 = request.GET.get('value1', '')
        value2 = request.GET.get('value2', '')
        value3 = request.GET.get('value3', '')
        value4 = request.GET.get('value4', '')
        value5 = request.GET.get('value5', '')
        googleToken = TokensModel.objects.filter(user_id=user_id).first().to_dict()["googleToken"]
        _id = None

        headers = {
            'Authorization': f'Bearer {googleToken}',
        }
        query = f"name='{title}' and trashed=false"
        url = f"https://www.googleapis.com/drive/v3/files?q={query}"

        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = json.loads(response.text)
            if 'files' in data and len(data['files']) > 0:
                _id = data['files'][0]['id']
            else:
                _id = create_file(title, googleToken)
        else:
            _id = create_file(title, googleToken)
        new_row_data = {
            'values': [[value1, value2, value3, value4, value5]],
        }
        response = requests.post(f"https://sheets.googleapis.com/v4/spreadsheets/{_id}/values/A1:append?valueInputOption=RAW", json=new_row_data, headers={
            'Authorization': f'Bearer {googleToken}',
            'Content-Type': 'application/json',
        })

        if response.status_code == 200:
            return JsonResponse({'message': 'New row added successfully'})
        else:
            return JsonResponse({'error': 'Failed to add new row'}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def sendEmail(request) -> HttpResponse:
    """
    Sends an email to the specified recipient.

    :return: JSON response with a success message or an error response.
    :rtype: django.http.HttpResponse
    """
    email = request.GET.get('email', None)
    content = request.GET.get('content', None)
    html_message = render_to_string('emailAction.html', {'content': content})
    plain_message = strip_tags(html_message)
    message = EmailMultiAlternatives(
        subject = "[NEW] Napte Reaction",
        body = plain_message,
        from_email =  "napte.epitech@outlook.com" ,
        to = [email]
    )
    message.attach_alternative(html_message, "text/html")
    message.send()
    return JsonResponse({"success": "Mail sent"}, status=200)
