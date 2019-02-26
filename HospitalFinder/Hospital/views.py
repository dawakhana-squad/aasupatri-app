from django.shortcuts import render,redirect,get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.models import User

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


def doctor_edit(request, pk):
    doc = get_object_or_404(Doctor, pk=pk)       
    if(request.user.id == doc.user_id):
        if request.method == "POST":
            form = DocForm(request.POST, instance=doc)
            if form.is_valid():
                doc = form.save(commit=False)
                doc.user = request.user
                doc.save()
                return redirect('home')
        else:
            form = DocForm(instance=doc)
        return render(request, 'edit.html', {'form': form})
    else:
        return render(request,'forbidden.html',{})


def hospitalEdit(request):
	if request.POST:
		print(request.POST)
		if "email" in request.POST:
			tempUser = (User.objects.filter(id=request.user.id))[0]
			tempUser.email = request.POST['email']
			tempUser.save()
			return redirect('home')
		if "phone" in request.POST:
			tempUser = (User.objects.filter(id=request.user.id))[0]
			tempUser.profile.phone = request.POST['phone']
			tempUser.profile.save()
			return redirect('home')
		if "address" in request.POST:
			tempUser = (User.objects.filter(id=request.user.id))[0]
			tempUser.profile.Address = request.POST['address']
			print(request.POST['address'])
			print(request.POST)
			tempUser.profile.save()
			return redirect('address')
	else:
		return render(request,'editHosp.html',{})