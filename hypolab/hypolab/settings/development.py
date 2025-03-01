from .base import *

DEBUG = True

ALLOWED_HOSTS = []

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