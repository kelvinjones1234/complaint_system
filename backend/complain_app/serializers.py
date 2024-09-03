from rest_framework import serializers
from .models import Complaint, Feedback, ComplaintCategory

# ComplaintCategory Serializer
class ComplaintCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintCategory
        fields = '__all__'

# Feedback Serializer
class FeedbackSerializer(serializers.ModelSerializer):
    complaint_text = serializers.CharField(source='complaint.title')  # Accessing the title of the related complaint

    class Meta:
        model = Feedback
        fields = ["id", "status", "message", "created_at", "complaint", "complaint_text"]

# Complaint Serializer
class ComplaintSerializer(serializers.ModelSerializer):
    feedback = FeedbackSerializer(many=True, read_only=True)  # Include related feedback in the complaint

    class Meta:
        model = Complaint
        fields = '__all__'
