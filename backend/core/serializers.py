from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class SignupSerializer(serializers.Serializer):
    firstName = serializers.CharField(max_length=150)
    lastName = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    dateOfBirth = serializers.DateField(required=False, allow_null=True)
    password = serializers.CharField(write_only=True, min_length=8)
    confirmPassword = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        if data.get('password') != data.get('confirmPassword'):
            raise serializers.ValidationError("Passwords do not match")
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        return data

    def create(self, validated_data):
        username = validated_data.get('email')
        first_name = validated_data.get('firstName')
        last_name = validated_data.get('lastName')
        password = validated_data.get('password')
        user = User(username=username, email=validated_data.get('email'), first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user
