import json
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse

from calendar_app.models.calendar import Calendar, CalendarPerm


class CalendarViewTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        UserModel = get_user_model()
        cls.owner_username = 'OwnerUser'
        cls.owner_email = 'owner@example.com'
        cls.owner_password = 'ownerpass123owner'
        cls.owner = UserModel.objects.create_user(
            username=cls.owner_username,
            email=cls.owner_email,
            password=cls.owner_password
        )

        cls.shared_username = 'SharedUser'
        cls.shared_email = 'shared@example.com'
        cls.shared_password = 'sharedpass123shared'
        cls.shared_user = UserModel.objects.create_user(
            username=cls.shared_username,
            email=cls.shared_email,
            password=cls.shared_password
        )

    def setUp(self):
        self.client = Client()
        self.url = reverse('own-calendars')

    def test_get_returns_empty_list_when_no_calendars(self):
        self.client.force_login(self.owner)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'calendars': []})

    def test_get_returns_owned_and_shared_calendars(self):
        self.client.force_login(self.shared_user)

        # One calendar owned by shared_user
        own_cal = Calendar.objects.create(owner=self.shared_user, name='MyCal', edited_by=self.shared_user)

        # One calendar owned by owner but shared to shared_user
        owners_cal = Calendar.objects.create(owner=self.owner, name='TeamCal', edited_by=self.owner)
        CalendarPerm.objects.create(
            calendar=owners_cal,
            user=self.shared_user,
            can_edit_events=True
        )

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('calendars', data)
        self.assertEqual(len(data['calendars']), 2)

        names = sorted([c['name'] for c in data['calendars']])
        self.assertEqual(names, ['MyCal', 'TeamCal'])

    def test_post_creates_calendar_and_returns_list(self):
        self.client.force_login(self.owner)
        payload = {'name': 'Work'}

        response = self.client.post(
            self.url,
            json.dumps(payload),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body.get('success'), 'ok')
        self.assertIn('calendars', body)
        self.assertTrue(any(c['name'] == 'Work' for c in body['calendars']))


