
from rest_framework import serializers
from .models import GroceryItem

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItem
        fields = '__all__'