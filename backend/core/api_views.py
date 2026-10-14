from rest_framework import viewsets, permissions, mixins
from .models import Property, Booking
from .api_serializers import PropertySerializer, BookingSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get'])
    def bookings(self, request, pk=None):
        prop = self.get_object()
        bookings = prop.bookings.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)


class BookingViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # users see their bookings, hosts see bookings for their properties
        user = self.request.user
        if user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(models.Q(guest=user) | models.Q(property__owner=user)).distinct()

    def perform_create(self, serializer):
        serializer.save(guest=self.request.user)

    @action(detail=True, methods=['post'], url_path='confirm')
    def confirm(self, request, pk=None):
        booking = self.get_object()
        user = request.user
        # Only the property owner or admin can confirm
        if not (user.is_staff or booking.property.owner == user):
            return Response({'detail': 'Not authorized to confirm this booking'}, status=status.HTTP_403_FORBIDDEN)
        # Only pending bookings can be confirmed
        if booking.status != 'pending':
            return Response({'detail': 'Only pending bookings can be confirmed'}, status=status.HTTP_400_BAD_REQUEST)
        # Double-check overlapping confirmed bookings
        overlapping = Booking.objects.filter(
            property=booking.property,
            status='confirmed',
            check_in__lt=booking.check_out,
            check_out__gt=booking.check_in,
        ).exclude(id=booking.id).exists()
        if overlapping:
            return Response({'detail': 'Property already booked for these dates'}, status=status.HTTP_409_CONFLICT)
        booking.status = 'confirmed'
        booking.save()
        return Response(BookingSerializer(booking).data)

    @action(detail=True, methods=['post'], url_path='reject')
    def reject(self, request, pk=None):
        booking = self.get_object()
        user = request.user
        if not (user.is_staff or booking.property.owner == user):
            return Response({'detail': 'Not authorized to reject this booking'}, status=status.HTTP_403_FORBIDDEN)
        if booking.status not in ('pending',):
            return Response({'detail': 'Only pending bookings can be rejected'}, status=status.HTTP_400_BAD_REQUEST)
        booking.status = 'rejected'
        booking.save()
        return Response(BookingSerializer(booking).data)
