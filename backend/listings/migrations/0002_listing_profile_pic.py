# Generated by Django 4.2.7 on 2023-12-11 18:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="profile_pic",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
    ]
