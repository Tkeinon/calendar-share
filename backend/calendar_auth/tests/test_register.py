import json
from django.contrib.auth import get_user_model
from django.test import TestCase, Client
from django.urls import reverse


class RegisterTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.username = 'existinguser'
        cls.email = 'existing@example.com'
        cls.password = 'testpass123testp'
        cls.user = get_user_model().objects.create_user(
            username=cls.username,
            email=cls.email,
            password=cls.password
        )

    def setUp(self):
        self.client = Client()
        self.register_url = reverse('register')

    def _client(self, data):
        response = self.client.post(
            self.register_url,
            json.dumps(data),
            content_type='application/json' 
        )

        return response

    def test_register_success(self):
        """ Test successful registration """
        response = self._client({
            'username': 'newuser',
            'email': 'new@example.com',
            'password1': 'newpass123newp',
            'password2': 'newpass123newp'
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'message': 'Registration succesful'})

    def test_register_optional_email_empty(self):
        """ Test registration with empty email field """
        response = self._client({
            'username': 'newuser2',
            'email': '',
            'password1': 'newpass123newp',
            'password2': 'newpass123newp'
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'message': 'Registration succesful'})
    
    def test_register_missing_username(self):
        """ Test missing username field """
        response = self._client({
            'email': 'missing@example.com',
            'password1': 'newpass123newp',
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Missing required fields'})

    def test_register_passwords_do_not_match(self):
        """ Test mismatched passwords """
        response = self._client({
            'username': 'userx',
            'email': 'userx@example.com',
            'password1': 'newpass123newp',
            'password2': 'oldpass321newp'
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Passwords do not match'})

    def test_register_existing_username(self):
        """ Test registration fails due to duplicate username """
        response = self._client({
            'username': self.username, 
            'email': 'unique@example.com',
            'password1': 'pass123',
            'password2': 'pass123'
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Username already exists'})

    def test_register_existing_email(self):
        """ Test registration fails due to duplicate email """
        response = self._client({
            'username': 'uniqueuser',
            'email': self.email, 
            'password1': 'pass123',
            'password2': 'pass123'
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Email already exists'})

    def test_register_short_password(self):
        """ Test registration fails with password too short """
        response = self._client({
            'username': 'shortpassuser',
            'email': 'shortpass@example.com',
            'password1': '123',
            'password2': '123'
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertTrue(any('12 characters' in msg for msg in response.json()['error']))

    def test_register_password_same_as_username(self):
        """ Test registration fails if password is too similar to username """
        response = self._client({
            'username': 'johnny',
            'email': 'johnny@example.com',
            'password1': 'johnny123',
            'password2': 'johnny123'
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertTrue(any('too similar' in msg for msg in response.json()['error']))
