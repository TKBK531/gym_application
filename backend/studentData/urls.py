from django.urls import path
from .views import StudentCreateView

urlpatterns = [
    path('studentsList/', StudentCreateView.as_view(), name='student-create'),
]
