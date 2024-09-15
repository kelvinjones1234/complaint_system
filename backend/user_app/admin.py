from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

admin.site.site_url = None

admin.site.site_header = "Actu Admin Pannel"
admin.site.site_title = "Actu"
admin.site.index_title = "Welcome Actu Admin Pannel"

class UserAdmin(BaseUserAdmin):
    # Define the display columns for the admin interface
    list_display = ('email', 'first_name', 'last_name', 'status', 'is_staff', 'is_active')
    list_filter = ('status', 'is_staff', 'is_active',)
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    # Custom form layout in the admin interface
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name', 'status')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    # Fields to be displayed when adding a new user through the admin interface
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'status', 'password1', 'password2'),
        }),
    )

    # Add read-only fields for 'last_login' and
    readonly_fields = ('last_login', 'date_joined')

# Register the custom User model with the custom UserAdmin class

admin.site.register(User, UserAdmin)

