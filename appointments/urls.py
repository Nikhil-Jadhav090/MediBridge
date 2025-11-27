from django.urls import path
from . import views

urlpatterns = [
    path('', views.appointments_collection, name='appointments_collection'),
    path('<int:appt_id>/', views.appointments_detail, name='appointments_detail'),
]