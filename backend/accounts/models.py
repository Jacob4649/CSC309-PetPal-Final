from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, name, password, profile_pic=None,
    address=None, province=None, city=None, postal_code=None):
        if not email:
            raise ValueError("Missing email field")
        email = self.normalize_email(email)
        user = self.model(email=email,
                          name=name,
                          profile_pic=profile_pic,
                          address=address,
                          province=province,
                          city=city,
                          postal_code=postal_code)
        user.is_shelter = False
        user.set_password(password)
        user.save()
        return user

    def create_pet_seeker(self, email, name, password, profile_pic=None,
    address=None, province=None, city=None, postal_code=None):
        pet_seeker = self.create_user(email, name, password, profile_pic, address, province, city, postal_code)
        return pet_seeker

    def create_shelter(self, email, name, password, profile_pic=None,
    address=None, province=None, city=None, postal_code=None, description=None,):
        shelter = self.create_user(email, name, password, profile_pic, address, province, city, postal_code)
        shelter.description = description
        shelter.is_shelter = True
        shelter.save()
        return shelter


class User(AbstractBaseUser):
    email = models.EmailField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    profile_pic = models.ImageField(null=True)
    address = models.CharField(max_length=200, null=True)
    province = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    postal_code = models.CharField(max_length=200, null=True)
    USERNAME_FIELD = 'email'

    is_shelter = models.BooleanField(null=False)

    # SHELTER SPECIFIC ATTRIBUTES
    description = models.TextField(null=True, blank=True)

    objects = UserManager()
