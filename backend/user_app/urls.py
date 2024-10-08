from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
  MyTokenObtainPairView, 
  RegisterUserView,
  PasswordResetRequestView,
  PasswordResetView

)

urlpatterns = [
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register/', RegisterUserView.as_view(), name='register'),
  path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
  path('reset-password/<uidb64>/<token>/', PasswordResetView.as_view(), name='password_reset_confirm'),

]