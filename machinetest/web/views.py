from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from members. models import Member 
from django.db.models import Q
from  django.core.paginator import Paginator

def index(request):
    return render(request,'web/login.html')


@login_required()
def dashboard(request):
    num=''
    if 'q' in request.GET:
        q = request.GET['q']
        multiple_q = Q(
        Q(first_name__icontains=q )| 
        Q(last_name__icontains=q ) |
        Q(member_id__icontains=q ) |
        Q(email__icontains=q ) |
        Q(city__icontains=q ) |
        Q(phone__icontains=q )
        
        )
        members_list = Member.objects.filter(multiple_q)
    else:
        members_list = Member.objects.all()
        paginator = Paginator(members_list,10)
        page_number = request.GET.get('page')
        members_list = paginator.get_page(page_number)
        num = 'a'* members_list.paginator.num_pages
    context = {
        "members_list" :members_list,
        "num" : num
    }
    return render(request,'web/dashboard.html',context)