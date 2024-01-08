import json
import time
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from backendNew.models.service import ServiceModel

@csrf_exempt
def getAbout(request) -> HttpResponse:
    """
    View that returns information about the application and its services.

    :param request: The HTTP request object.
    :type request: HttpRequest

    :return: HTTP response containing application information.
    :rtype: HttpResponse
    """
    if request.method == 'GET':
        response_data = {
            'client': {
                'host': ''
            },
            'server': {
                'current_time': int(time.time()),
                'services': [],
            }
        }
        response_data['client']['host'] = request.META.get('REMOTE_ADDR')
        services = ServiceModel.objects.all()
        for service in services:
            isFound = False
            for entry in response_data['server']['services']:
                if entry['name'] == service.name:
                    isFound = True
            if not isFound:
                response_data['server']['services'].append({'name': service.name, 'actions': [], 'reactions': []})
            for entry in response_data['server']['services']:
                if entry['name'] == service.name:
                    if service.type == 'Reaction':
                        if len(entry['reactions']) != 0:
                            entry['reactions'].append({'name': service.action, 'description': 'replace this with actual description'})
                        else:
                            entry['reactions'] = [{'name': service.action, 'description': 'replace this with actual description'}]
                    else:
                        if len(entry['actions']) != 0:
                            entry['actions'].append({'name': service.action, 'description': 'replace this with actual description'})
                        else:
                            entry['actions'] = [{'name': service.action, 'description': 'replace this with actual description'}]
        return HttpResponse(json.dumps(response_data), status=200)
    return HttpResponse("Invalid method", status=405)
