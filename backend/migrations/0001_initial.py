# Generated by Django 4.2.7 on 2023-11-18 21:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("listings", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Application",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_time", models.DateTimeField(auto_now_add=True)),
                ("last_updated_time", models.DateTimeField(auto_now=True)),
                (
                    "application_status",
                    models.IntegerField(
                        choices=[
                            (1, "Approved"),
                            (2, "Pending"),
                            (3, "Declined"),
                            (4, "Withdrawn"),
                        ]
                    ),
                ),
                ("content", models.TextField()),
                (
                    "listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="listings.listing",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
