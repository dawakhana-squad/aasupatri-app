from django.db import models
from django.conf import settings

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
