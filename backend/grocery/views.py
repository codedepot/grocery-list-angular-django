from .models import GroceryItem
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GroceryItem
from .serializers import GroceryListSerializer
from django.shortcuts import get_object_or_404

class GroceryList(APIView):
    def get(self, request):
        items = GroceryItem.objects.order_by('created').all()
        serializer = GroceryListSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        item_serializer = GroceryListSerializer(data=request.data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response(item_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        count = GroceryItem.objects.all().delete()
        return Response({'message': '{} Grocery items were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
class GroceryItemDetail(APIView):
    def get(self, request, item_id):
        item = get_object_or_404(GroceryItem, pk=item_id)
        serializer = GroceryListSerializer(item, many=False)
        return Response(serializer.data)
    

    def put(self, request, item_id):
   
        item = get_object_or_404(GroceryItem, pk=item_id)
        mutable_data = request.data.copy()
        if "created" in mutable_data:
            del mutable_data["created"]

        serializer = GroceryListSerializer(item, data=mutable_data, partial=True)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, item_id):
        item = get_object_or_404(GroceryItem, pk=item_id)
        GroceryItem.delete(item)
        return Response({'message': 'Item successfully deleted'}, status=status.HTTP_200_OK) 

