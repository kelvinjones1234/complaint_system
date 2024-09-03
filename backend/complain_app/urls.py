from django.urls import path
from .views import ComplaintCreateAPIView, ComplaintCategoryView, FeedbackView


urlpatterns = [
  path('complain/', ComplaintCreateAPIView.as_view(), name='complain'),
  path('complain-category/', ComplaintCategoryView.as_view(), name='complain_category'),
  path('feedbacks/', FeedbackView.as_view(), name='complain'),


]