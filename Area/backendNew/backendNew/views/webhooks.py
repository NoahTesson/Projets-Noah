from backendNew.views.checkForReactions import checkForReactions
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import redirect
from utils.githubparser import GithubParser
import json

@csrf_exempt
def receiveGitHub(request) -> HttpResponse:
    """
    Receive GitHub webhook data.

    This view handles incoming GitHub webhook data, parses it using the GitHubParser, and checks for reactions using checkForReactions.

    :param request: Django request object.
    :type request: django.http.HttpRequest

    :return: JSON response or HTTP status code indicating the result of processing the GitHub webhook data.
    :rtype: django.http.HttpResponse
    """
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        event = request.headers.get('X-GitHub-Event', None)
        result: dict = GithubParser.parseWebhook(data, event)
        print("event = ", event)
        print("result = ", result)
        if event not in ['create', 'repository', 'push', 'pull_request'] or (result['action'] == 'default' or result['message'] == 'default'):
            return HttpResponse("Not Implemented", status=501)
        path = checkForReactions("github", result['action'], result['message'], None)
        if path:
            print("path = ", path)
            return redirect(path)
        else:
            return HttpResponse(status=500)
    else:
        return HttpResponse("Invalid method", status=405)
    return HttpResponse(status=500)