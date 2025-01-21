from rest_framework import generics, status
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer

class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        response_data = {
            "status": "success",
            "message": "Student record created successfully.",
            "data": serializer.data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            "status": "success",
            "message": "Student records retrieved successfully.",
            "data": serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)
