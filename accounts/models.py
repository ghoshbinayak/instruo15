import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _
from django.dispatch import Signal, receiver
from django.db.models.signals import post_save

from accounts.tasks import send_mail_task, echo_task

# signal sent when user is created
user_created = Signal(providing_args=["email"])


class instruoUserManager(BaseUserManager):

    """user manager for instruoUser"""

    def _create_user(self, email, password, is_staff,
                     is_superuser, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,
                          is_staff=is_staff,
                          is_superuser=is_superuser, last_login=now,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        # send signal to the profile creater
        user_created.send(sender=self, email=email)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email,
                                 password,
                                 True,
                                 True,
                                 is_active=True,
                                 **extra_fields)


class instruoUser(AbstractBaseUser, PermissionsMixin):

    """
    Custor user model for Robodarshan website
    """
    email = models.EmailField(max_length=254, unique=True)
    fullname = models.CharField(max_length=200)
    is_staff = models.BooleanField(_('staff status'),
                                   default=False,
                                   help_text=_('Designates whether the user can log into this admin '
                                               'site.'))
    is_active = models.BooleanField(_('active'),
                                    default=False,
                                    help_text=_('Designates whether this user should be treated as '
                                                'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    objects = instruoUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELD = ['fullname']

    class Meta:
        swappable = 'AUTH_USER_MODEL'
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_absolute_url(self):
        return "/users/%s/" % urlquote(self.email)

    def get_full_name(self):
        if self.fullname:
            return self.fullname
        else:
            return "mask man"

    def get_short_name(self):
        "Returns the nickname for the user."
        if self.fullname:
            return str(self.fullname).split()[0]
        else:
            return "maskman"

    def email_user(self, subject, message, from_email=None):
        """
        Sends an email to this User.
        """
        send_mail_task.delay(subject, message, from_email, [self.email])


class Participant(instruoUser):

    ''' Proxy model for Participants'''
    class Meta:
        proxy = True
        app_label = 'accounts'
        verbose_name = 'Participant account'
        verbose_name_plural = 'Participant accounts'


class SiteAdmin(instruoUser):

    ''' Proxy model for Site Admin'''
    class Meta:
        proxy = True
        app_label = 'accounts'
        verbose_name = 'Site Admin account'
        verbose_name_plural = 'Site Admin accounts'


class Organiser(instruoUser):

    ''' Proxy model for Organiser'''
    class Meta:
        proxy = True
        app_label = 'accounts'
        verbose_name = 'Organiser account'
        verbose_name_plural = 'Organiser accounts'


class Profile(models.Model):

    """
    Generic user profile, common for both contestants and coordinators
    """
    department = models.CharField(max_length=100, blank=True)
    email_verify_key = models.CharField(max_length=100, blank=True)
    password_reset_key = models.CharField(max_length=100, blank=True)
    password_reset_key_timestamp = models.DateTimeField(blank=True, null=True)
    uuid = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20)
    user = models.OneToOneField(instruoUser)

    def __unicode__(self):
        return self.user.email


class OrganiserProfile(models.Model):

    """
    Profile of Team Instruo
    """
    designation = models.CharField(max_length=100, blank=True)
    facebook_url = models.CharField(max_length=256, blank=True)
    user = models.OneToOneField(instruoUser)

    def __unicode__(self):
        return self.user.email


class SocialProfile(models.Model):

    """
    Google+ sign in info
    """
    user = models.OneToOneField(instruoUser)
    uid = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    access_token = models.CharField(max_length=256)
    refresh_token = models.CharField(max_length=256)
    expires_at = models.IntegerField(blank=True)


@receiver(user_created)
def create_profile(sender, **kwargs):
    """
    Create a profile when new user is created.
    """
    user = instruoUser.objects.get(email=kwargs.get('email'))
    profile = Profile(user=user)
    profile.uuid = str(uuid.uuid1())
    profile.save()


@receiver(post_save, sender=instruoUser)
def create_orginiser_profile(sender, **kwargs):
    user = kwargs.get('instance')
    if user.is_staff:
        try:
            # check if organiserprofile exists
            op = user.organiserprofile
        except OrganiserProfile.DoesNotExist:
            # create organiserprofile
            op = OrganiserProfile(user=user)
            op.save()
    else:
        try:
            # check if organiserprofile exists
            op = user.organiserprofile
            op.delete()
        except OrganiserProfile.DoesNotExist:
            pass
