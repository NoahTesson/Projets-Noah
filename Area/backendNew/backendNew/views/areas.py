from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from backendNew.models.rule import RuleModel
from backendNew.models.service import ServiceModel
from backendNew.models.users import UserModel
import json
from django.http import JsonResponse
from utils.token import analyseToken

@csrf_exempt
def create(request) -> HttpResponse:
    """
    Create a new rule based on the provided data.

    :param request: The HTTP request object.
    :type request: HttpRequest

    :return: HTTP response containing the created rule data.
    :rtype: HttpResponse
    """
    try:
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        if request.method == "POST":
            if (user := UserModel.objects.filter(id=db_token.user.id).first()) is not None:
                body_unicode = request.body.decode('utf-8')
                body = json.loads(body_unicode)
                triggerId = body["triggerId"]
                actionId = body["actionId"]
                title = body.get("title", None)
                description = body.get("description", None)
                actionToken = body.get("actionToken", None)
                triggerToken = body.get("triggerToken", None)
                rule = RuleModel.objects.create(title=title, description=description, user_id=user.id, trigger_id=triggerId, action_id=actionId, actionToken=actionToken, triggerToken=triggerToken)
            return HttpResponse(json.dumps(rule.to_dict()), status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def listByUser(request) -> HttpResponse:
    """
    List rules created by the authenticated user.

    :param request: The HTTP request object.
    :type request: HttpRequest

    :return: HTTP response containing a list of rules.
    :rtype: HttpResponse
    """
    try:
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        if request.method == "GET":
            if (user := UserModel.objects.filter(id=db_token.user.id).first()) is not None:
                rules = RuleModel.objects.filter(user_id=user.id).all()
                if not rules:
                    return JsonResponse({"status": "empty"}, status=200)
                data = [rules.to_dict() for rules in rules]
                return HttpResponse(json.dumps(data), status=200)
        return HttpResponse("Invalid method", status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def getServicesActions(request) -> HttpResponse:
    """
    Get actions provided by specific services.

    :param request: The HTTP request object.
    :type request: HttpRequest

    :return: HTTP response containing a list of service actions.
    :rtype: HttpResponse
    """
    try:
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        if request.method == "POST":
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            name = body["name"]
            _type = body["type"]
            services = ServiceModel.objects.filter(name=name, type=_type).all()
            data = [services.to_dict() for services in services]
            return HttpResponse(json.dumps(data), status=200)
        return JsonResponse({"error": "Invalid method"}, status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)


@csrf_exempt
def getServices(request) -> HttpResponse:
    """
    Get unique service names based on the provided type.

    :param request: The HTTP request object.
    :type request: HttpRequest

    :return: HTTP response containing unique service names.
    :rtype: HttpResponse
    """
    try:
        db_token = analyseToken(request)
        if db_token is None:
            return JsonResponse({"error": "Invalid credentials"}, status=403)
        if request.method == "POST":
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            _type = body['type']
            services = ServiceModel.objects.filter(type=_type).all()
            data = [services.to_dict() for services in services]
            unique_names = list(set(item["name"].capitalize() for item in data))
            return HttpResponse(json.dumps(unique_names), status=200)
        else:
            return JsonResponse({"error": "Invalid method"}, status=405)
    except Exception as e:
        return HttpResponse(str(e), status=500)

@csrf_exempt
def getById(request, _id) -> HttpResponse:
    """
    Get, delete, or update a rule based on the provided ID.

    :param request: The HTTP request object.
    :type request: HttpRequest

    :param _id: The ID of the rule to retrieve, delete, or update.
    :type _id: int

    :return: HTTP response containing the rule data or operation status.
    :rtype: HttpResponse
    """
    db_token = analyseToken(request)
    if db_token is None:
        return JsonResponse({"error": "Invalid credentials"}, status=403)
    if request.method == "GET":
        if (rule := RuleModel.objects.filter(id=_id).first()) is not None:
            return HttpResponse(json.dumps(rule.to_dict()), status=200)
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    elif request.method == "DELETE":
        if (tmp := RuleModel.objects.filter(id=_id).first()) is not None:
            tmp.delete()
            return JsonResponse({"status": "Successfully Deleted"}, status=200)
        return JsonResponse({"error": "Invalid credentials"}, status=400)
    elif request.method == "PUT":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        title = body.get("title", None)
        description = body.get("description", None)
        triggerId = body.get("triggerId", None)
        actionId = body.get("actionId", None)
        actionToken = body.get("actionToken", None)
        triggerToken = body.get("triggerToken", None)
        rule = RuleModel.objects.filter(id=_id).first()
        if not rule:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
        if title:
            rule.title = title
        if description:
            rule.description = description
        if actionToken:
            rule.actionToken = actionToken
        if triggerToken:
            rule.triggerToken = triggerToken
        if triggerId:
            rule.trigger_id = triggerId
        if actionId:
            rule.action_id = actionId
        rule.save()
        return HttpResponse(json.dumps(rule.to_dict()), status=200)
    return JsonResponse({"error": "Invalid Method"}, status=405)