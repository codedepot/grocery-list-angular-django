from django.db import models

class GroceryItem(models.Model):

    name = models.CharField(max_length=2000)
    comments = models.CharField(max_length=2000, blank=True)
    purchased = models.BooleanField(default=False)
    priority = models.IntegerField(default=1)
    count = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

