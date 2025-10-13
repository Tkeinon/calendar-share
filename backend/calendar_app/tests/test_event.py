import json
from datetime import datetime, timezone, timedelta

from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse

from calendar_app.models.calendar import Calendar


class CreateEventTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        UserModel = get_user_model()
        cls.username = 'EventOwner'
        cls.email = 'eventowner@example.com'
        cls.password = 'ownerpass123owner'
        cls.user = UserModel.objects.create_user(
            username=cls.username,
            email=cls.email,
            password=cls.password
        )

        cls.calendar = Calendar.objects.create(owner=cls.user, name='Events', edited_by=cls.user)

    def setUp(self):
        self.client = Client()
        self.client.force_login(self.user)

        self.url = reverse('create-event')

    def _post(self, data):
        return self.client.post(self.url, json.dumps(data), content_type='application/json')

    def test_missing_calendar(self):
        payload = {
            'title': 'Meeting',
            'start': datetime.now(timezone.utc).isoformat(),
            'end': (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
        }
        resp = self._post(payload)
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json(), {'error': 'Missing calendar'})

    def test_missing_title(self):
        payload = {
            'calendar': self.calendar.id,
            'start': datetime.now(timezone.utc).isoformat(),
            'end': (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
        }
        resp = self._post(payload)
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json(), {'error': 'Missing title'})

    def test_missing_dates(self):
        payload = {
            'calendar': self.calendar.id,
            'title': 'Meeting'
        }
        resp = self._post(payload)
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json(), {'error': 'Missing date'})

    def test_start_after_end(self):
        end = datetime.now(timezone.utc)
        start = end + timedelta(hours=1)
        payload = {
            'calendar': self.calendar.id,
            'title': 'Backwards',
            'start': start.isoformat(),
            'end': end.isoformat()
        }
        resp = self._post(payload)
        self.assertEqual(resp.status_code, 400)
        self.assertIn('Start date', resp.json()['error'])

    def test_calendar_not_found(self):
        payload = {
            'calendar': 999999,
            'title': 'MissingCal',
            'start': datetime.now(timezone.utc).isoformat(),
            'end': (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
        }
        resp = self._post(payload)
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json(), {'error': 'Calendar not found'})

    def test_success_creates_event_and_returns_payload(self):
        start = datetime.now(timezone.utc)
        end = start + timedelta(hours=2)
        payload = {
            'calendar': self.calendar.id,
            'title': 'Workshop',
            'description': 'Deep dive',
            'location': 'Room 1',
            'color': '#ffffff',
            'start': start.isoformat(),
            'end': end.isoformat(),
        }

        resp = self._post(payload)
        self.assertEqual(resp.status_code, 200)
        body = resp.json()
        self.assertIn('event', body)
        event = body['event']
        self.assertEqual(event['title'], 'Workshop')
        self.assertEqual(event['location'], 'Room 1')


