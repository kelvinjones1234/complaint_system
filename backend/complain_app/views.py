from rest_framework import generics, permissions
from .models import Complaint, ComplaintCategory, Feedback
from .serializers import ComplaintSerializer, ComplaintCategorySerializer, FeedbackSerializer

class ComplaintCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only the complaints made by the current logged-in user
        return Complaint.objects.filter(created_by=self.request.user)



class ComplaintCategoryView(generics.ListAPIView):
    queryset = ComplaintCategory.objects.all()
    serializer_class = ComplaintCategorySerializer

class FeedbackView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only the complaints made by the current logged-in user
        return Feedback.objects.filter(complaint__created_by=self.request.user)


