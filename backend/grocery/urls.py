from django.urls import path

from grocery import views

app_name = "grocery"
urlpatterns = [
    path("", views.GroceryList.as_view(), name="index"),
    path("<int:item_id>/", views.GroceryItemDetail.as_view(), name="detail"),
    ]
