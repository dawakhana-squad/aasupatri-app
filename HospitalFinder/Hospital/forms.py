from django import forms
from .models import Doctor

class DocForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Name of the Doctor",
            "class":"input-field"
        }        
    ),label='Name')

    speciality = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':'Speciality of the Doctor',
            "class" : "input-field"
        }
    ),label='Speciality')

    timing = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Available timings of the Doctor ",
            "class":"input-field"
        }        
    ),label='Timing')

    email = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Email ID of the Doctor",
            "class":"input-field"
        }        
    ),label='Email')

    registrationNumber = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Reg Number of the Dcotor",
            "class":"input-field"
        }        
    ),label='Registration Number',required=False)
    
    class Meta:         
        model = Doctor
        fields = ("name","speciality","timing","email","registrationNumber")

