from django.shortcuts import render,redirect
from .forms import *
from .models import *

# Create your views here.


def home(request, *args, **kwargs):
	qset = Doctor.objects.all()
	context={
		"Hello":"Hi this is hfbkd ma",
		"DocDetails": qset
	}
	return render(request,"home.html",context)


def create(request, *args, **kwargs):
	if request.method == "POST":
		form = DocForm(request.POST)
		if form.is_valid():
			doc =  form.save(commit=False)
			doc.user = request.user
			doc.save()
			return redirect('home')
	else:
		form = DocForm()
	return render(request,"create.html",{'form':form})