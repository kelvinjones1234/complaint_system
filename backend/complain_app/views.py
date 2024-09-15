from rest_framework import generics, permissions
from .models import Complaint, ComplaintCategory, Feedback
from .serializers import ComplaintSerializer, ComplaintCategorySerializer, FeedbackSerializer

class ComplaintCreateAPIView(generics.ListCreateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ComplaintCategoryView(generics.ListAPIView):
    queryset = ComplaintCategory.objects.all()
    serializer_class = ComplaintCategorySerializer

class FeedbackView(generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


