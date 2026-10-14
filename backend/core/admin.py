from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import User, Property, Booking


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = DjangoUserAdmin.fieldsets + (
        ('Additional', {'fields': ('date_of_birth', 'role')}),
    )


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'city', 'country', 'owner', 'published')
    list_filter = ('published', 'city', 'country')
    search_fields = ('title', 'description', 'city', 'country')


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'property', 'guest', 'check_in', 'check_out', 'status')
    list_filter = ('status',)
    search_fields = ('property__title', 'guest__username')
