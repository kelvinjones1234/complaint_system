from django.urls import path
from .views import ComplaintCreateAPIView, ComplaintCategoryView, FeedbackView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('api/complain/', ComplaintCreateAPIView.as_view(), name='complain'),
  path('api/complain-category/', ComplaintCategoryView.as_view(), name='complain_category'),
  path('api/feedbacks/', FeedbackView.as_view(), name='complain'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)