import json
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse


class LogoutTests(TestCase):
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
        self.logout_url = reverse('logout')

    def _client(self):
        response = self.client.post(
            self.logout_url,
            content_type='application/json'
        )

        return response
    
    def login_user(self):
        """Helper to log in the test user"""
        self.client.post(
            self.login_url,
            json.dumps({
                'username': self.username,
                'password': self.password
            }),
            content_type='application/json'
        )

    def test_logout_success(self):
        """ Test successfully logging out """
        self.login_user()
        response = self._client()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'message': 'Logged out'})

    def test_logout_not_logged_in(self):
        """ Test logout fails if user is not logged in """
        response = self._client()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Not logged in'})

    def test_logout_clears_session(self):
        """ Test session is cleared after logout """
        self.login_user()
        self.assertTrue('_auth_user_id' in self.client.session)

        self._client()
        self.assertFalse('_auth_user_id' in self.client.session)
