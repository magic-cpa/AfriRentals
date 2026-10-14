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
