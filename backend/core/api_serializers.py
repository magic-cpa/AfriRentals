from rest_framework import serializers
from .models import Property, Booking
from django.utils import timezone
from datetime import timedelta


class PropertySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Property
        fields = ['id', 'owner', 'title', 'description', 'address', 'city', 'country', 'latitude', 'longitude', 'capacity', 'base_price_cents', 'currency', 'published', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['owner'] = request.user
        return super().create(validated_data)


class BookingSerializer(serializers.ModelSerializer):
    guest = serializers.ReadOnlyField(source='guest.username')
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Booking
        fields = ['id', 'property', 'guest', 'check_in', 'check_out', 'guests_count', 'status', 'total_amount_cents', 'currency', 'created_at', 'updated_at']
        read_only_fields = ['status', 'total_amount_cents', 'currency', 'guest']

    def validate(self, data):
        check_in = data.get('check_in')
        check_out = data.get('check_out')
        guests_count = data.get('guests_count') or 1
        prop = data.get('property')

        if not check_in or not check_out:
            raise serializers.ValidationError('check_in and check_out are required')
        if check_in >= check_out:
            raise serializers.ValidationError('check_out must be after check_in')
        # capacity
        if guests_count > prop.capacity:
            raise serializers.ValidationError('guests_count exceeds property capacity')
        # overlapping confirmed bookings
        overlapping = Booking.objects.filter(
            property=prop,
            status='confirmed',
            check_in__lt=check_out,
            check_out__gt=check_in,
        ).exists()
        if overlapping:
            raise serializers.ValidationError('The property is already booked for the requested dates')
        return data

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            validated_data['guest'] = user
        # compute nights and total
        check_in = validated_data.get('check_in')
        check_out = validated_data.get('check_out')
        nights = (check_out - check_in).days
        prop = validated_data.get('property')
        total = (prop.base_price_cents or 0) * max(nights, 0)
        validated_data['total_amount_cents'] = total
        validated_data['currency'] = prop.currency or 'USD'
        # default status pending
        validated_data['status'] = 'pending'
        return super().create(validated_data)
