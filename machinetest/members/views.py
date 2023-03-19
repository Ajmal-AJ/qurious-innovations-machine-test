from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import logout
from django.contrib import messages
import json

from . models import Member


def admin_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, email=username, password=password)
        if user is not None:
            if user.is_authenticated:
                auth_login(request, user)
                return redirect('web:dashboard')
            else:
                messages.error(request, 'invalid username or password')
                return redirect('web:index')
        else:
            messages.error(request, 'Invalid Credentials')

    return render(request, 'web/login.html')


def admin_logout(request):
    logout(request)
    return redirect('web:index')


def add_member(request):
    if request.method == "POST":
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        phone = request.POST['phone']
        country_code = request.POST['country_code']
        address = request.POST['address']
        city = request.POST['city']
        date_of_birth = request.POST['dob']
        passport_number = request.POST['passport_number']
        passport_expiry_date = request.POST['expire_date']
        

        Member.objects.create(
            first_name = first_name,
            last_name = last_name,
            email = email,
            phone = phone,
            country_code = country_code,
            address = address,
            city = city,
            date_of_birth = date_of_birth,
            passport_number = passport_number,
            passport_expiry_date = passport_expiry_date
        )

        response_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone": phone,
            "address": address,
            "date_of_birth": date_of_birth,
            "passport_number": passport_number,
            "passport_expiry_date": passport_expiry_date,
            "country_code" : country_code,
        }
        return JsonResponse(
            {
                'msg': "data saved successfully",
                "data": response_data,
            }
        )
    else:
        return JsonResponse(
            {
                'error': "Something Went Wrong",
            }
        )
    return render(request, 'web/dashboard.html')


def edit_member(request,id):
    if request.method == "POST":
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        email = request.POST["email"]
        phone = request.POST["phone"]
        address = request.POST["address"]
        city = request.POST["city"]
        date_of_birth = request.POST["dob"]
        passport_number = request.POST["passport_number"]
        passport_expiry_date = request.POST["expire_date"]
        country_code = request.POST['country_code']
       
        Member.objects.filter(id=id).update(
            first_name =first_name,
            last_name =last_name,
            email =email,
            phone =phone,
            address =address,
            city  = city,
            date_of_birth =date_of_birth,
            passport_number = passport_number,
            passport_expiry_date =passport_expiry_date,
            country_code = country_code,
        )
        return JsonResponse({"msg": "Updated data"})
    member = Member.objects.get(id=id)
    data = {
        "member_id" : member.member_id,
        "first_name" :member.first_name,
        "last_name" :member.last_name,
        "email" :member.email,
        "phone" :member.phone,
        "address" :member.address,
        "city" :member.city,
        "date_of_birth" :member.date_of_birth,
        "passport_number" :member.passport_number,
        "passport_expiry_date" :member.passport_expiry_date,
        "country_code" : member.country_code,
        }
    return JsonResponse({"data": data})


def deactivate_member(request,id):
    Member.objects.filter(id=id).update(is_active=False)
    return JsonResponse({"msg": "Deactivate Member"})


def reactivate_member(request,id):
    Member.objects.filter(id=id).update(is_active=True)
    return JsonResponse({
        "msg": "reactivated member"
    })


def multiple_member_status_update(request):
    ids = request.POST.getlist('ids[]')
    status = request.POST['status']
    is_active = True
    msg = 'reactivated successfully'
    if status == "deactivate":
        is_active = False
        msg = 'deactivated successfully'
    Member.objects.filter(id__in=ids).update(is_active=is_active)
    return JsonResponse({ "msg": msg})