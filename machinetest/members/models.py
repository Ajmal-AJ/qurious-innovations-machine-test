from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser


class UserManager(BaseUserManager):
    def create_staff_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have a Email')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.save(using=self._db)
        if user:
            return user

    def create_superuser(self, email, password):
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self.db)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=128,default="superuser")
    objects = UserManager()
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    def __str__(self):
        return str(self.email)


class Member(models.Model):
    member_id = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    country_code = models.CharField(max_length=55)
    phone = models.CharField(max_length=255)
    address = models.CharField(max_length=355)
    city = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    passport_number = models.CharField(max_length=255)
    passport_expiry_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.member_id:
            self.member_id = "18BTIT2F28"+str(self.id + (10 ** 1))
            self.save()
        else:
            pass

    def __str__(self):
        return str(self.member_id)
