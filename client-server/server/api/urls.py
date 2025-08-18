from django.urls import path
from . import views

urlpatterns = [
    path('races/', views.list_races, name='list_races'),
    path('predict/', views.predict_next_race, name='predict_next_race'),
]
