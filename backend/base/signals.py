from django.contrib.auth.models import User
from django.db.models.signals import pre_save


def update_user(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(update_user, sender=User)
