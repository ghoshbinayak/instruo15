from django.db import models
from accounts.models import Organiser, Participant


class category(models.Model):

    """model cotaining the category names"""
    name = models.CharField(max_length=100, default="uncatagorised")
    description = models.TextField()

    def __unicode__(self):
        return self.name


class event(models.Model):

    """an event instance"""
    uuid = models.CharField(max_length=32, primary_key=True)
    f_uuid = models.CharField(max_length=32)  # if the full histoy is needed
    timestamp = models.DateTimeField()  # will be added automatically
    title = models.CharField(max_length=256)
    cover_image_link = models.CharField(max_length=256)
    time = models.DateTimeField()
    location = models.CharField(max_length=256)
    short_description = models.TextField()
    description = models.TextField()
    coordinator1 = models.ForeignKey(
        Organiser, related_name='event_coordinator1')
    coordinator2 = models.ForeignKey(
        Organiser, related_name='event_coordinator2')
    volunteer1 = models.ForeignKey(
        Organiser, blank=True,
        null=True, related_name='event_volunteer1')
    volunteer2 = models.ForeignKey(
        Organiser, blank=True,
        null=True, related_name='event_volunteer2')
    announcements = models.TextField(default="NONE", blank=True)

    def __unicode__(self):
        return 'fuuid: ' + self.f_uuid + ' uuid: ' + self.uuid


class event_list(models.Model):

    """approved_event stores the list of events currently displayed"""
    # uuid of first instance
    f_uuid = models.CharField(max_length=32, primary_key=True)
    # uuid of current event instance
    c_uuid = models.ForeignKey(event, related_name='approved_event_current')
    # uuid of latest event instance
    l_uuid = models.ForeignKey(event, related_name='approved_event_latest')
    category = models.ForeignKey(category, default=1)
    published = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now=True)
    participant = models.ManyToManyField(Participant)  # time last updated

    def __unicode__(self):
        return self.c_uuid.title
