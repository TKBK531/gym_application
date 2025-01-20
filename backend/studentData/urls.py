from django.urls import path
from .views import StudentCreateView, StudentListView


urlpatterns = [
    path("studentsList/", StudentCreateView.as_view(), name="student-create"),
    path("studentsView/", StudentListView.as_view(), name="student-list"),
]
