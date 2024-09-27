from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from.serializers import (
    MyTokenObtainPairSerializer, 
    UserSerializer,
    PasswordResetRequestSerializer,
    PasswordResetSerializer
    )
from django.core.mail import send_mail

from rest_framework.views import APIView
from rest_framework import generics, status
from .models import User
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import PasswordResetRequestSerializer
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class PasswordResetRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                reset_link = f'http://localhost:5173/user/reset-password/{uid}/{token}/'
                
                # HTML message template
                message_html = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                        }}
                        .container {{
                            width: 100%;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            max-width: 600px;
                            margin: 20px auto;
                        }}
                        .header {{
                            background-color: #0044cc;
                            padding: 10px 20px;
                            color: #fff;
                            text-align: center;
                            border-radius: 10px 10px 0 0;
                        }}
                        .button {{
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #0044cc;
                            color: black;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold;
                        }}
                        .footer {{
                            margin-top: 30px;
                            font-size: 12px;
                            text-align: center;
                            color: #777;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Password Reset Request</h1>
                        </div>
                        <p>Hello,</p>
                        <p>You have requested to reset your password. Please click the button below to reset it:</p>
                        <p style="text-align: center;">
                            <a href="{reset_link}" class="button">Reset Password</a>
                        </p>
                        <p>If the button above does not work, click the link below:</p>
                        <p><a href="{reset_link}">{reset_link}</a></p>
                        <p>If you did not request this, please ignore this email.</p>
                        <div class="footer">
                            <p>Thank you,</p>
                            <p>ACTU FPB Support Team</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                
                # Plain text version
                plain_message = strip_tags(message_html)

                from_email = f'ACTU FPB Support Team <{settings.DEFAULT_FROM_EMAIL}>'
                recipient_list = [email]

                # Send email
                send_mail(
                    subject='Password Reset Request',
                    message=plain_message,  # Fallback to plain text
                    from_email=from_email,
                    recipient_list=recipient_list,
                    html_message=message_html,  # HTML content
                )
                
                return Response({'message': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': f'Error sending email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    def post(self, request, uidb64, token, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            uid = force_str(urlsafe_base64_decode(uidb64))
            try:
                user = User.objects.get(pk=uid)
                if default_token_generator.check_token(user, token):
                    user.set_password(serializer.validated_data['password'])
                    user.save()
                    return Response({'message': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)