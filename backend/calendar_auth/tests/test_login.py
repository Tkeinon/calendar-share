import json
from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token
from django.test import Client, TestCase
from django.urls import reverse



class LoginTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        UserModel = get_user_model() 
        cls.username = 'TestUser'
        cls.password = 'testpassword'
        cls.email = 'testuser@test.com'
        cls.user = UserModel.objects.create_user(
            username=cls.username,
            email=cls.email,
            password=cls.password
        )

    def setUp(self):
        self.client = Client()
        self.login_url = reverse('login')

    def _client(self, data):
        response = self.client.post(
            self.login_url,
            json.dumps(data),
            content_type='application/json'
        )

        return response
    
    def test_login_success_username(self):
        """ Test successfully loggin in"""
        response = self._client({
            'username': self.username,
            'password': self.password
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'message': 'Logged in',
            'user': {
                'email': self.user.email, 
                'id': self.user.id, 
                'username': self.user.username
            }
        })
    
    def test_login_success_email(self):
        """ Test successfully loggin in"""
        response = self._client({
            'username': self.email,
            'password': self.password
        })


        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('message'), 'Logged in')

    def test_login_invalid_username(self):
        """ Test login fails with invalid username """
        response = self._client({
            'username': 'OtherTestUser',
            'password': self.password
        })

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'error': 'Missing credentials'})

    def test_login_invalid_password(self):
        """ Test login fails with invalid password """
        response = self._client({
            'username': self.username,
            'password': 'xxxxx'
        })

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'error': 'Missing credentials'})
    
    def test_login_missing_username(self):
        """ Test login fails with missing username """
        response = self._client({
            'password': 'xxxxx'
        })


        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Missing credentials'})
            
    def test_login_missing_password(self):
        """ Test login fails with missing password """
        response = self._client({
            'username': self.username,
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Missing credentials'})
