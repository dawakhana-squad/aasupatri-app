from django.db import models
from django.contrib.auth.models import User,AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from datetime import date
from django.utils import timezone

# Create your models here.

class Doctor(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
	name = models.CharField(max_length=100)
	email= models.CharField(max_length=150)
	speciality = models.CharField(max_length=200)
	timing = models.CharField(max_length=200)
	registrationNumber = models.CharField(max_length=20)

	def __str__(self):
		return str(self.name)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)    
    hospitalID = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    Address = models.CharField(max_length=300)
    specalitiesAvaliable=models.CharField(max_length=100,null =True)
    
    def __str__(self):  # __unicode__ for Python 2
        return str(self.user)