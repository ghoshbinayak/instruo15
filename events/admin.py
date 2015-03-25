from django.contrib import admin

# Register your models here.
from events.models import event_list, event, category


class event_listAdmin(admin.ModelAdmin):

    def event_name(self, obj):
        return obj.c_uuid.title
    event_name.short_description = 'Event Name'

    def catagory(self, obj):
        return obj.c_uuid.catagory
    catagory.short_description = 'Catagory'

    def coordinator(self, obj):
        return obj.c_uuid.coordinator1
    coordinator.short_description = 'Coordinator'

    def time(self, obj):
        return obj.c_uuid.time
    time.short_description = 'Time'

    def is_updated(self, obj):
        return obj.c_uuid == obj.l_uuid
    is_updated.boolean = True
    is_updated.short_description = 'Is updated?'

    def current(self, obj):
        return '<a href="http://localhost:8000/admin/events/event/%s">current</a>' % (obj.c_uuid.uuid)
    current.short_description = 'current version'
    current.allow_tags = True

    def latest(self, obj):
        return '<a href="http://localhost:8000/admin/events/event/%s">latest</a>' % (obj.l_uuid.uuid)
    latest.short_description = 'latest version'
    latest.allow_tags = True

    list_display = ('event_name', 'coordinator', 'time',
                    'published', 'is_updated', 'current', 'latest')
    date_hierarchy = 'timestamp'
    list_filter = ['published']
    readonly_fields = ('f_uuid', 'c_uuid', 'l_uuid')

    fieldsets = (
        ('Edit Event Details', {
            'fields': ('f_uuid', 'published', 'c_uuid', 'l_uuid')
        }),
    )

    def make_published(self, request, queryset):
        queryset.update(published=True)
    make_published.short_description = "Published selected stories"

    def unpublish(self, request, queryset):
        queryset.update(published=False)
    unpublish.short_description = "Unpublish selected stories"

    def update_event(self, request, queryset):
        # queryset.update(=0)
        for el in queryset:
            el.c_uuid = el.l_uuid
            el.save()
    update_event.short_description = "Update event to latest version"

    actions = [make_published, unpublish, update_event]


class eventAdmin(admin.ModelAdmin):
    readonly_fields = ('f_uuid', 'uuid', 'timestamp')
    fieldsets = (
        ('Event IDs', {
            'fields': ('f_uuid', 'uuid', 'timestamp')
        }),
        ('Edit Details', {
            'fields': ('title', 'time', 'location', 'description')
        }),
        ('Coordinators', {
            'fields': ('coordinator1', 'coordinator2', 'volunteer1',
                       'volunteer2', 'announcements')
        }),
    )


admin.site.register(event_list, event_listAdmin)
admin.site.register(event, eventAdmin)
admin.site.register(category)
