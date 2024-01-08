from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backendNew.models.tokens import TokensModel
import json
import requests
from django.shortcuts import redirect
from utils.token import analyseToken
import os
from dotenv import load_dotenv

load_dotenv()

@csrf_exempt
def login_profile(request):
    """
    Redirects the user to the Trello authorization page for profile access.

    This view initiates the Trello OAuth authorization flow to allow the user to grant access to their Trello profile.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: Redirects the user to the Trello authorization page.
    :rtype: django.shortcuts.redirect
    """
    url = f'https://trello.com/1/authorize?return_url={os.getenv("TRELLO_REDIRECT_URI")}&callback_method=fragment&scope={os.getenv("TRELLO_SCOPE")}&expiration=never&name=napte&key={os.getenv("TRELLO_CLIENT_ID")}&response_type=token'
    return redirect(url)

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Set and store the Trello access token for the user.

    This view receives and stores the Trello access token for the authenticated user in the database.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the stored Trello access token.
    :rtype: django.http.HttpResponse

    Response structure:
    {
        "user_id": "ID of the user",
        "trelloToken": "Stored Trello access token"
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
            thisToken = TokensModel(user_id=user_id, trelloToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.trelloToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def createOrganization(request) -> HttpResponse:
    """
    Create a Trello organization for the user.

    This view creates a Trello organization with the specified name for the user.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the organization details.
    :rtype: django.http.HttpResponse

    Response structure:
    {
        "id": "Organization ID",
        "name": "Organization name",
        ... (other organization details)
    }
    """
    tok = TokensModel.objects.filter(user_id=request.GET.get('user_id', '')).first()
    url = "https://api.trello.com/1/organizations"

    headers = {
        "Accept": "application/json"
    }

    query = {
        'displayName': request.GET.get('name', 'napte'),
        'key': os.getenv("TRELLO_CLIENT_ID"),
        'token': tok.trelloToken
    }

    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=query
    )
    print(response)
    print(response.json())
    return HttpResponse(json.dumps(json.loads(response.text)), status=200)

def me(user_id):
    tok = TokensModel.objects.filter(user_id=user_id).first()
    if not tok:
        return False
    print("cccc")
    url = f'https://trello.com/1/members/you?key={os.getenv("TRELLO_CLIENT_ID")}&token={tok.trelloToken}'
    headers = {
        "Accept": "application/json"
    }

    query = {
        'key': os.getenv("TRELLO_CLIENT_ID"),
        'token': tok.trelloToken
    }

    response = requests.request(
        "GET",
        url,
        headers=headers,
        params=query
    )
    return json.loads(response.text)['id']

@csrf_exempt
def getOrganization(request) -> HttpResponse:
    """
    Get Trello organizations associated with the user.

    This view retrieves Trello organizations that are associated with the user.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the list of user's Trello organizations.
    :rtype: django.http.HttpResponse

    Response structure:
    [
        {
            "id": "Organization ID",
            "name": "Organization name",
            ... (other organization details)
        },
        ...
    ]
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    print("cccc")
    user_id = db_token.user_id
    print(user_id)
    _id = me(user_id)
    print("cccc")
    tok = TokensModel.objects.filter(user_id=user_id).first()
    if not tok:
        return HttpResponse(status=401)
    url = f"https://api.trello.com/1/members/{_id}/organizations"
    headers = {
        "Accept": "application/json"
    }

    query = {
        'key': os.getenv("TRELLO_CLIENT_ID"),
        'token': tok.trelloToken
    }

    response = requests.request(
        "GET",
        url,
        headers=headers,
        params=query
    )
    return HttpResponse(json.dumps(json.loads(response.text)), status=200)

@csrf_exempt
def createBoard(request) -> HttpResponse:
    """
    Create a Trello board.

    This view creates a Trello board with the specified name for the user.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the board details.
    :rtype: django.http.HttpResponse

    Response structure:
    {
        "id": "Board ID",
        "name": "Board name",
        ... (other board details)
    }
    """
    tok = TokensModel.objects.filter(user_id=request.GET.get('user_id', '')).first()
    url = "https://api.trello.com/1/boards/"

    query = {
        'name': request.GET.get('name', 'napteBoard'),
        'idOrganization': request.GET.get('idOrganization', ''),
        'key': os.getenv("TRELLO_CLIENT_ID"),
        'token': tok.trelloToken
    }

    response = requests.request(
        "POST",
        url,
        params=query
    )
    return HttpResponse(json.dumps(json.loads(response.text)), status=200)
