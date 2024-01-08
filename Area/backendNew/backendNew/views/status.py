from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import requests
from backendNew.models.tokens import TokensModel
from utils.token import analyseToken
import os
from dotenv import load_dotenv

load_dotenv()

@csrf_exempt
def getStatus(request) -> HttpResponse:
    """
    Retrieve the status of user-connected services.

    Retrieves the status of various user-connected services such as Google, Twitter, GitHub, Spotify, Discord,
    LinkedIn, and Trello based on the availability of associated tokens.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response with the status of user-connected services.
    :rtype: django.http.JsonResponse

    Response structure:
    {
        "status": [
            {"google": "Yes" or "No"},
            {"twitter": "Yes" or "No"},
            {"github": "Yes" or "No"},
            {"spotify": "Yes" or "No"},
            {"discord": "Yes" or "No"},
            {"linkedin": "Yes" or "No"},
            {"trello": "Yes" or "No"}
        ]
    }
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    if request.method == 'GET':
        user_id = db_token.user.to_dict()['id']
        token = TokensModel.objects.filter(user_id=user_id).first()
        services = []
        if token is None:
            return JsonResponse({"status": [{'google': "No"}, {'twitter': "No"}, {'github': "No"}, {'spotify': "No"}, {'discord': "No"}, {'linkedin': "No"}, {'trello': "No"}]}, status=200)
        if token.googleToken :
            r = requests.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token.googleToken)
            if r.status_code != 200:
                services.append({'google': "No"})
            else:
                services.append({'google': "Yes"})
        else:
            services.append({'google': "No"})
        if token.twitterToken:
            r = requests.get("https://api.twitter.com/2/users/me", headers={"Authorization": "Bearer " + token.twitterToken})
            if r.status_code != 200 and r.status_code != 429:
                services.append({'twitter': "No"})
            else:
                services.append({'twitter': "Yes"})
        else:
            services.append({'twitter': "No"})
        if token.githubToken:
            r = requests.get("https://api.github.com/user", headers={"Authorization": "Bearer " + token.githubToken})
            if r.status_code != 200:
                services.append({'github': "No"})
            else:
                services.append({'github': "Yes"})
        else:
            services.append({'github': "No"})
        if token.spotifyToken:
            r = requests.get('https://api.spotify.com/v1/me', headers={'Authorization': f'Bearer {token.spotifyToken}'})
            if r.status_code != 200:
                services.append({'spotify': "No"})
            else:
                services.append({'spotify': "Yes"})
        else:
            services.append({'spotify': "No"})
        if token.discordToken:
            r = requests.get('https://discord.com/api/users/@me', headers={'Authorization': f'Bearer {token.discordToken}'})
            if r.status_code != 200:
                services.append({'discord': "No"})
            else:
                services.append({'discord': "Yes"})
        else:
            services.append({'discord': "No"})
        if token.linkedinToken:
            r = requests.get('https://api.linkedin.com/v2/userinfo', headers={"Authorization": f'Bearer {token.linkedinToken}'})
            if r.status_code != 200:
                services.append({"linkedin": "No"})
            else:
                services.append({"linkedin": "Yes"})
        else:
            services.append({"linkedin": "No"})
        if token.trelloToken:
            r = requests.get(f'https://trello.com/1/members/you?key={os.getenv("TRELLO_CLIENT_ID")}&token={token.trelloToken}', headers={"Authorization": f'Bearer {token.trelloToken}'})
            if r.status_code != 200:
                services.append({"trello": "No"})
            else:
                services.append({"trello": "Yes"})
        else:
            services.append({"trello": "No"})
        return JsonResponse({"status": services}, status=200)
    else:
        return JsonResponse({'error': 'Invalid Methods'}, status=405)