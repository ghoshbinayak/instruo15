"""
Django settings for instruo project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'vi(kvf0&k!p=8cqf85ptp&8h%wwa5dpcvh*e1^tmh^pf^s(#12'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['*', ]


# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'kombu.transport.django',
    'djcelery',
    'accounts',
    'main',
    # 'debug_toolbar',
    'events',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'instruo.urls'

WSGI_APPLICATION = 'instruo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Login Url
LOGIN_URL = '/accounts/login/'

# Custom User Model
AUTH_USER_MODEL = 'accounts.instruoUser'
AUTH_PROFILE_MODULE = 'accounts.Profile'

# Email smtp setup
EMAIL_USE_TLS = False
EMAIL_HOST = '64.62.143.83'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'noreply@instruo.in'
EMAIL_HOST_PASSWORD = '$omethingunthinkable'
HOST_BASE_URL = 'instruo.in/'

# Email verification timeout (in days)
VERIFY_TIMEOUT = 2

# Celery setup
BROKER_URL = "django://"
CELERY_RESULT_BACKEND = 'djcelery.backends.database:DatabaseBackend'


# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = 'static/'

# Media files (User Uploaded Content)
MEDIA_ROOT = 'media/'
MEDIA_URL = '/media/'
