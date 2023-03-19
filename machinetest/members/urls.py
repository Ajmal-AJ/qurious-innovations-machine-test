from django.urls import path
from . import views

app_name = 'members'

urlpatterns = [
    path('login/',views.admin_login,name='admin_login'),

    path('add-member/',views.add_member,name="add_member"),
    path('edit-member/<str:id>/',views.edit_member,name="edit_member"),

    path('deactivate-member/<str:id>',views.deactivate_member,name="deactivate_member"),
    path('reactivate-member/<str:id>',views.reactivate_member,name="reactivate_member"),
    path('status-update/',views.multiple_member_status_update,name="muliple_member_status_update"),

    path('logout/',views.admin_logout,name='admin_logout'),

]