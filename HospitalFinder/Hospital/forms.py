from django import forms
from .models import Doctor

class DocForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Name of the Doctor",
            "class":"input-field"
        }        
    ),label='Name')

    email = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Email f the Doctor",
            "class":"input-field"
        }        
    ),label='Email')

    timing = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Timing of the doctor",
            "class":"input-field"
        }        
    ),label='Timing')
    speciality = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':'speciality of the Doctor',
            "class" : "input-field"
        }
    ))
    registrationNumber = forms.CharField(widget=forms.TextInput(
        attrs={
            'placeholder':"Reg Number of the doctor",
            "class":"input-field"
        }        
    ),label='Registration Number',required=False)
    
    class Meta:         
        model = Doctor
        fields = ("name","email","timing","speciality","registrationNumber")

