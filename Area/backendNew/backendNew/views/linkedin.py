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
    Redirects the user to the LinkedIn OAuth login page.

    :return: Redirect response to the LinkedIn OAuth login page.
    :rtype: django.shortcuts.redirect
    """
    url = f'https://www.linkedin.com/oauth/v2/authorization?client_id={os.getenv("LINKEDIN_CLIENT_ID")}&redirect_uri={os.getenv("LINKEDIN_REDIRECT_URI")}&scope={os.getenv("LINKEDIN_SCOPE")}&response_type=code&state=state'
    return redirect(url)

@csrf_exempt
def callback(request):
    """
    Handles the LinkedIn OAuth callback and retrieves the access token.

    :return: Redirect response with the user's access token or an error response.
    :rtype: django.shortcuts.redirect or django.http.JsonResponse
    """
    if request.GET.get('error'):
        error_description = request.GET.get('error_description')
        return JsonResponse({"Error": error_description}, status=500)
    authorization_code = request.GET.get('code')
    url= f'https://www.linkedin.com/oauth/v2/accessToken'
    r = requests.post(url, data={
            'grant_type': 'authorization_code',
            'code': authorization_code,
            'client_id': {os.getenv('LINKEDIN_CLIENT_ID')},
            'client_secret': os.getenv('LINKEDIN_CLIENT_SECRET'),
            'redirect_uri': os.getenv('LINKEDIN_REDIRECT_URI')
        },
        headers={'Content-Type': 'application/x-www-form-urlencoded'})
    data = r.json()
    if (r.status_code != 200):
        return JsonResponse({"error" : "An error occurend"}, status=500)
    access_token = data['access_token']
    return redirect(f'http://localhost:8081?token={access_token}')

@csrf_exempt
def setToken(request) -> HttpResponse:
    """
    Sets or updates a LinkedIn token for the user.

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
            thisToken = TokensModel(user_id=user_id, linkedinToken=token)
            thisToken.save()
        else:
            thisToken = TokensModel.objects.filter(user_id=user_id).first()
            thisToken.linkedinToken = token
            thisToken.save()
        return HttpResponse(json.dumps(thisToken.to_dict()), content_type='application/json', status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def postALinkedinPost(request) -> HttpResponse:
    """
    Posts a message to LinkedIn on behalf of the user.

    :return: JSON response with a success message or an error response.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'GET':
        user_id = request.GET.get('user_id')
        content = request.GET.get('content')
        tokens = TokensModel.objects.filter(user_id=user_id).first()
        if not tokens:
            return JsonResponse({"error": "Invalid token"}, status=401)
        accessToken = tokens.linkedinToken
        r = requests.get('https://api.linkedin.com/v2/userinfo', headers={"Authorization": f'Bearer {accessToken}'})
        data = r.json()
        r = requests.post('https://api.linkedin.com/v2/ugcPosts', json={
            "author": f"urn:li:person:{data['sub']}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": content
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }, headers={
            'X-Restli-Protocol-Version': '2.0.0',
            'LinkedIn-Version': '202310',
            'Authorization': f'Bearer {accessToken}'
        })
        data = r.json()
        return JsonResponse({"status": "Message is posted"}, status=r.status_code)