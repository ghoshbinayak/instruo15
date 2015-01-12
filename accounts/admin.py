from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q

from accounts.models import SiteAdmin, Participant, Organiser
from accounts.models import Profile, OrganiserProfile
from accounts.forms import instruoUserChangeForm
from accounts.forms import instruoUserCreationForm


class ProfileInlile(admin.StackedInline):
    model = Profile
    fieldsets = (
        (None, {'fields': ('department', 'phone')}),
    )
    extra = 0


class OrganiserProfileInlile(admin.StackedInline):
    model = OrganiserProfile
    extra = 0


class SiteAdminAdmin(UserAdmin):
    # The forms to add and change user instances
    readonly_fields = ('last_login', 'date_joined')
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference the removed 'username' field
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('fullname',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'is_organiser', 'groups',
                                       'user_permissions')}),
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
    inlines = [ProfileInlile, OrganiserProfileInlile]

    def get_queryset(self, request):
        qs = super(UserAdmin, self).get_queryset(request)
        qs = qs.filter(Q(is_superuser=True) | Q(is_staff=True))
        return qs

    def get_formsets_with_inlines(self, request, obj=None):
        for inline in self.get_inline_instances(request, obj):
            if inline.get_queryset(request).count() > 0:
                yield inline.get_formset(request, obj), inline


class OrganiserAdmin(SiteAdminAdmin):

    def get_queryset(self, request):
        qs = super(UserAdmin, self).get_queryset(request)
        qs = qs.filter(Q(is_organiser=True))
        return qs


class ParticipantAdmin(SiteAdminAdmin):

    def get_queryset(self, request):
        qs = super(UserAdmin, self).get_queryset(request)
        qs = qs.exclude(
            Q(is_staff=True) | Q(is_superuser=True) | Q(is_organiser=True))
        return qs


admin.site.register(SiteAdmin, SiteAdminAdmin)
admin.site.register(Organiser, OrganiserAdmin)
admin.site.register(Participant, ParticipantAdmin)
