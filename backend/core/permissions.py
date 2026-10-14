from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Allow full access to owners, read-only for others."""

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only to the owner
        return getattr(obj, 'owner', None) == request.user
