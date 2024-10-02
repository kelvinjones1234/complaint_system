from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
      token = super().get_token(user)
      token['email'] = user.email
      token['first_name'] = user.first_name
      token['status'] = user.status
      token['last_name'] = user.last_name
      token['phone'] = user.phone
      token['date_joined'] = user.date_joined.isoformat()
      return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'phone', 'first_name', 'last_name', 'status', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            status=validated_data['status'],
            phone=validated_data['phone'],
            password=validated_data['password'],
        )
        return user


class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match")
        return data

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.CharField()