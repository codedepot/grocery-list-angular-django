from datetime import datetime

from django.test import TestCase
from django.urls import reverse

from .models import GroceryItem


class GroceryItemTests(TestCase):
    def test_str(self):
        item = GroceryItem.objects.create(name="My name")
        self.assertEqual(item.__str__(), "My name")


class GroceryListTests(TestCase):
    def test_no_items(self):
        response = self.client.get(reverse("grocery:index"))
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.data, [])


    def test_create_item(self):
        response = self.client.post(reverse("grocery:index"), data={
            "name": "Test Object",
            "count": "2",
        })
        self.assertEqual(response.status_code, 201)

        response = self.client.get(reverse("grocery:index"))
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Test Object")
        self.assertEqual(response.data[0]["purchased"], False)
        self.assertEqual(response.data[0]["priority"], 1)
        self.assertEqual(response.data[0]["count"], 2)
        created = datetime.strptime(response.data[0]["created"], "%Y-%m-%dT%H:%M:%S.%fZ")
        self.assertGreater(datetime.now(), created)

    def test_create_item_bad_request(self):
        response = self.client.post(reverse("grocery:index"), data={
            'not_name': "Test Object",
        })
        self.assertEqual(response.status_code, 400)

    def test_delete_all_item(self):
        response = self.client.post(reverse("grocery:index"), data={
            "name": "Test Object",
        })

        response = self.client.delete(reverse("grocery:index"))
        self.assertEqual(response.status_code, 204)

        response = self.client.get(reverse("grocery:index"))
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.data, [])

class GroceryItemDetailTests(TestCase):
    def test_not_found(self):
        url = reverse("grocery:detail", kwargs={'item_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

        response = self.client.put(url)
        self.assertEqual(response.status_code, 404)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)

    def test_get(self):
        response = self.client.post(reverse("grocery:index"), data={
            "name": "Test Object"
        })
        id = response.json()["id"]

        response = self.client.get(reverse("grocery:detail", kwargs={'item_id': id}))
        self.assertEqual(response.data["name"], "Test Object")


    def test_update(self):
        response = self.client.post(reverse("grocery:index"), data={
            "name": "Test Object",
            "count": "2",
        })
        id = response.json()["id"]

        update_date = "2000-00-00T16:06:27.064577Z"
        response = self.client.put(reverse("grocery:detail", kwargs={'item_id': id}), data={
            "name": "Test Object",
            "count": 3,
            "created": update_date
        }, content_type='application/json')
        self.assertEqual(response.data["count"], 3)
        self.assertNotEqual(response.data["created"], update_date)

    def test_update_bad_request(self):
        response = self.client.post(reverse("grocery:index"), data={
            "name": "Test Object",
        })
        id = response.json()["id"]

        response = self.client.put(reverse("grocery:detail", kwargs={'item_id': id}), data={
            "name": "Test Object",
            "count": "not a number",

        }, content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_delete(self):
        response = self.client.post(reverse("grocery:index"), data={
            "name": "Test Object"
        })
        id = response.json()["id"]

        
        response = self.client.delete(reverse("grocery:detail", kwargs={'item_id': id}))
        self.assertEqual(response.status_code, 200)
