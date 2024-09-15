from django.db import models
from user_app.models import User


class ComplaintCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Complaint Categories'

class Complaint(models.Model):
    # STATUS_CHOICES = [
    #     ('received', 'Received'),
    #     ('in_review', 'In Review'),
    #     ('reviewed', 'Reviewed'),
    # ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(ComplaintCategory, on_delete=models.SET_NULL, null=True)
    # status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='received')
    file = models.FileField(upload_to="", blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Complaints'
    

class Feedback(models.Model):
    STATUS_CHOICES = [
        ('received', 'Received'),
        ('in_review', 'In Review'),
        ('reviewed', 'Reviewed'),
    ]
    complaint = models.ForeignKey(Complaint, related_name='feedback', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='received')
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.complaint.title}"
