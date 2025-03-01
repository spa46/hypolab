from .base import *

DEBUG = False

ALLOWED_HOSTS = ['your-production-domain.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'hypodb',
        'USER': 'test',
        'PASSWORD': 'test1234',
        'HOST': 'localhost',  # Set to 'localhost' or the IP address of your database server
        'PORT': '5432',  # Default port for PostgreSQL
    }
}