from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _

from accounts.models import instruoUser
from accounts.forms import instruoUserChangeForm
from accounts.forms import instruoUserCreationForm


class instruoUserAdmin(UserAdmin):
    # The forms to add and change user instances

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference the removed 'username' field
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('fullname',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )
    form = instruoUserChangeForm
    add_form = instruoUserCreationForm
    list_display = ('email', 'fullname', 'is_staff')
    search_fields = ('email', 'fullname')
    ordering = ('email',)

admin.site.register(instruoUser, instruoUserAdmin)
