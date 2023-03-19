from django.contrib import admin
from . models import User, Member


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    pass
