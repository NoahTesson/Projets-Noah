from django.test import TestCase
from django.urls import reverse
from backendNew.models.users import UserModel
from backendNew.models.user_token import UserToken
from backendNew.models.resetPassword import ResetPassword
from backendNew.models.service import ServiceModel
from backendNew.models.rule import RuleModel
import json
from django.contrib.auth.hashers import make_password, check_password
from utils.token import generateToken
import datetime
from datetime import timezone


class UserAuthenticationTests(TestCase):
    def setUp(self):
        self.token = "test_token"
        self.user_data = {
            "id": 1,
            "name": "TestUser",
            "surname": "TestSurname",
            "email": "test@example.com",
            "password": make_password("test_password"),
        }
        self.usr = UserModel.objects.create(**self.user_data)
        self.token = {
            'id': 1,
            'token': self.token,
            'created_at': datetime.datetime.now(timezone.utc),
            'user': self.usr
        }
        UserToken.objects.create(**self.token)
        self.rst = {
            "id": 1,
            "user_id": self.usr.id,
            "token": "test_token",
            "created_at": datetime.datetime.now(timezone.utc)
        }
        reset_password = ResetPassword.objects.create(**self.rst)

    def test_signup_success(self):
        signup_data = {
            "name": "NewUser",
            "surname": "NewSurname",
            "email": "newuser@example.com",
            "password": "new_password",
        }

        response = self.client.post(reverse("signup"), signup_data, content_type="application/json")

        response_data = response.json()
        user = UserModel.objects.get(email="newuser@example.com")
        user_token = UserToken.objects.get(user=user)

        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response_data)
        self.assertEqual(user.surname, "NewSurname")
        self.assertEqual(user.name, "NewUser")
        self.assertEqual(user_token.token, response_data['token'])

    def test_signup_success_same_email(self):
        signup_data = {
            "name": "TestUser",
            "surname": "TestSurname",
            "email": "test@example.com",
            "password": "test_password",
        }
        response = self.client.post(reverse("signup"), json.dumps(signup_data), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_signup_method_not_allowed(self):
        response = self.client.get(reverse("signup"))
        response_data = response.json()

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data.get('error'), "Invalid method")

    def test_signin(self):
        login_data = {
            "email": "test@example.com",
            "password": "test_password",
        }
        response = self.client.post(reverse("signin"), json.dumps(login_data), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_signin_invalid_credentials(self):
        data = {
            "email": "test@example.com",
            "password": "wrong_password"
        }
        response = self.client.post(reverse('signin'), json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response['content-type'], 'application/json')
        self.assertEqual(response.json(), {"error": "Invalid credentials"})

    def test_signin_invalid_method(self):
        response = self.client.get(reverse('signin'))
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response['content-type'], 'application/json')
        self.assertEqual(response.json(), {"error": "Invalid Methods"})

    def test_user_exists(self):
        check_user_data = {
            "email": "test@example.com",
        }
        response = self.client.post(reverse("user_exists"), json.dumps(check_user_data), content_type="application/json")

        self.assertEqual(response.status_code, 200)

    def test_user_not_exists(self):
        check_user_data = {
            "email": "nonexistent@example.com",
        }
        response = self.client.post(reverse("user_exists"), json.dumps(check_user_data), content_type="application/json")

        response_data = response.json()

        self.assertEqual(response_data.get("error"), "Invalid credentials")
        self.assertEqual(response.status_code, 400)

    def test_user_exist_invalid_methid(self):
        response = self.client.get(reverse("user_exists"))

        response_data = response.json()

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data.get("error"), "Invalid method")

#==========================def sendMail(request):==========================

    def test_send_mail__method_405(self):
        response = self.client.get(reverse("sendMail"))

        response_data = response.json()

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data.get("error"), "Invalid method")

#=========================== def resetPassword(request, token):==========================

    def test_reset_password_success_200(self):
        reset_data = {
            "password": "new_password",
        }

        response = self.client.post(reverse("resetPassword", args=["test_token"]), data=reset_data, content_type="application/json")

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('succes', response_data)

    def test_invalid_http_method_405(self):
        response = self.client.get(reverse("resetPassword", args=["some_token"]))

        self.assertEqual(response.status_code, 405)

# ================================def me(request): ================================

    def test_me_authenticated_200(self):
        response = self.client.get(reverse("me"), HTTP_X_AUTHORIZATION_KEY="test_token")

        self.assertEqual(response.status_code, 200)

    def test_invalid_http_method_405(self):
        response = self.client.post(reverse("me"), HTTP_X_AUTHORIZATION_KEY="test_token")


        self.assertEqual(response.status_code, 405)

class AboutTests(TestCase):
    def test_get_about_success(self):
        service_data = {
            "id": 1,
            "name": "TestService",
            "action": "TestAction",
            "type": "Action",
        }
        ServiceModel.objects.create(**service_data)

        response = self.client.get(reverse("about.json"))

        self.assertEqual(response.status_code, 200)

    def test_invalid_http_method_405(self):
        response = self.client.post(reverse("about.json"))


        self.assertEqual(response.status_code, 405)

class CreateTest(TestCase):
    def test_create_rule_unauthenticated_403(self):
        rule_data = {
        }
        response = self.client.post(reverse("create_areas"), data=rule_data, content_type="application/json")

        response_data = response.json()

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response_data.get("error"), "Invalid credentials")

class ListByUserTest(TestCase):
    def test_list_by_user_success(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(**user_data)
        token = generateToken()
        user_token = UserToken.objects.create(token=token, user=user)

        rule_data = {
            "id": 1,
            "title": "TestRule",
            "description": "Test Description",
            "user_id": user.id,
            "trigger_id": 1,
            "action_id": 2,
            "actionToken": "TestActionToken",
            "triggerToken": "TestTriggerToken",
        }
        rule = RuleModel.objects.create(**rule_data)

        response = self.client.get(reverse("list_by_user"), HTTP_X_AUTHORIZATION_KEY=token)

        self.assertEqual(response.status_code, 200)


    def test_list_by_user_unauthenticated_403(self):
        response = self.client.get(reverse("list_by_user"))

        response_data = response.json()

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response_data.get("error"), "Invalid credentials")

    def test_list_by_user_empty_200(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(**user_data)
        token = generateToken()
        user_token = UserToken.objects.create(token=token, user=user)
        response = self.client.get(reverse("list_by_user"), HTTP_X_AUTHORIZATION_KEY=token)

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data.get("status"), "empty")

class GetServicesActionsTest(TestCase):
    def test_get_services_actions_success(self):
        user_data = {
            "id": 1,
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(**user_data)
        token = generateToken()
        user_token = UserToken.objects.create(token=token, user=user)

        service_data = {
            "id": 1,
            "name": "TestService",
            "type": "Action",
            "action": "TestAction",
        }
        service = ServiceModel.objects.create(**service_data)

        request_data = {
            "name": "TestService",
            "type": "Action",
        }
        response = self.client.post(reverse("get_services_actions"), data=request_data, content_type="application/json", HTTP_X_AUTHORIZATION_KEY=token)

        self.assertEqual(response.status_code, 200)

    def test_get_services_actions_unauthenticated_403(self):
        request_data = {
            "name": "TestService",
            "type": "Action",
        }
        response = self.client.post(reverse("get_services_actions"), data=request_data, content_type="application/json")

        self.assertEqual(response.status_code, 403)

        response_data = response.json()
        self.assertEqual(response_data.get("error"), "Invalid credentials")

class GetServicesTest(TestCase):
    def test_get_services_success(self):
        user_data = {
            "id": 1,
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(**user_data)
        token = generateToken()
        user_token = UserToken.objects.create(token=token, user=user)

        service_data = {
            "id": 1,
            "name": "TestService",
            "type": "Action",
            "action": "TestAction",
        }
        service = ServiceModel.objects.create(**service_data)

        request_data = {
            "type": "Action",
        }
        response = self.client.post(reverse("get_services"), data=request_data, content_type="application/json", HTTP_X_AUTHORIZATION_KEY=token)

        self.assertEqual(response.status_code, 200)


    def test_get_services_unauthenticated_403(self):
        request_data = {
            "type": "Action",
        }
        response = self.client.post(reverse("get_services"), data=request_data, content_type="application/json")

        self.assertEqual(response.status_code, 403)

        response_data = response.json()
        self.assertEqual(response_data.get("error"), "Invalid credentials")

class GetByIdTest(TestCase):
    def test_get_by_id_success(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)

        rule_data = {
            "trigger_id": 1,
            "action_id": 2,
            "title": "TestRule",
            "description": "Test Description",
            "actionToken": "TestActionToken",
            "triggerToken": "TestTriggerToken",
            "user_id": user.id,
        }
        rule = RuleModel.objects.create(id=1, **rule_data)

        response = self.client.get(reverse("get_by_id", args=(rule.id,)), HTTP_X_AUTHORIZATION_KEY=token)

        self.assertEqual(response.status_code, 200)


    def test_get_by_id_not_found_400(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)
        response = self.client.get(reverse("get_by_id", args=(999,)), HTTP_X_AUTHORIZATION_KEY=token)
        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response_data.get("error"), "Invalid credentials")

    def test_delete_by_id_success(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)

        rule_data = {
            "trigger_id": 1,
            "action_id": 2,
            "title": "TestRule",
            "description": "Test Description",
            "actionToken": "TestActionToken",
            "triggerToken": "TestTriggerToken",
            "user_id": user.id,
        }
        rule = RuleModel.objects.create(id=1, **rule_data)

        response = self.client.delete(reverse("get_by_id", args=(rule.id,)), HTTP_X_AUTHORIZATION_KEY=token)

        response_data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data.get("status"), "Successfully Deleted")

    def test_delete_by_id_not_found_400(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)

        response = self.client.delete(reverse("get_by_id", args=(1,)), HTTP_X_AUTHORIZATION_KEY=token)
        self.assertEqual(response.status_code, 400)

        response_data = response.json()
        self.assertEqual(response_data.get("error"), "Invalid credentials")

    def test_update_by_id_success(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)

        rule_data = {
            "trigger_id": 1,
            "action_id": 2,
            "title": "TestRule",
            "description": "Test Description",
            "actionToken": "TestActionToken",
            "triggerToken": "TestTriggerToken",
            "user_id": user.id,
        }
        rule = RuleModel.objects.create(id=1, **rule_data)

        update_data = {
            "title": "UpdatedTitle",
            "description": "Updated Description",
        }
        response = self.client.put(reverse("get_by_id", args=(rule.id,)), data=update_data, content_type="application/json", HTTP_X_AUTHORIZATION_KEY=token)

        self.assertEqual(response.status_code, 200)

    def test_update_by_id_not_found_400(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)

        update_data = {
            "title": "UpdatedTitle",
            "description": "Updated Description",
        }
        response = self.client.put(reverse("get_by_id", args=(1,)), data=update_data, content_type="application/json", HTTP_X_AUTHORIZATION_KEY=token)
        self.assertEqual(response.status_code, 400)

        response_data = response.json()
        self.assertEqual(response_data.get("error"), "Invalid credentials")

    def test_update_by_id_not_authenticated_403(self):
        user_data = {
            "name": "TestUser",
            "email": "test@example.com",
            "password": "test_password",
        }
        user = UserModel.objects.create(id=1, **user_data)
        token = generateToken()
        user_token = UserToken.objects.create(id=1, token=token, user=user)

        rule_data = {
            "trigger_id": 1,
            "action_id": 2,
            "title": "TestRule",
            "description": "Test Description",
            "actionToken": "TestActionToken",
            "triggerToken": "TestTriggerToken",
            "user_id": user.id,
        }
        rule = RuleModel.objects.create(id=1, **rule_data)

        update_data = {"title": "UpdatedTitle", "description": "Updated Description"}
        response = self.client.put(reverse("get_by_id", args=(rule.id,)), data=update_data, content_type="application/json")

        self.assertEqual(response.status_code, 403)

        response_data = response.json()
        self.assertEqual(response_data.get("error"), "Invalid credentials")