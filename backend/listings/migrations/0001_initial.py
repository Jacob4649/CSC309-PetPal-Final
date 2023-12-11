# Generated by Django 5.0 on 2023-12-11 22:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('last_update_time', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=256)),
                ('species', models.CharField(max_length=256)),
                ('breed', models.CharField(max_length=256)),
                ('weight_lbs', models.FloatField()),
                ('height_feet', models.FloatField()),
                ('age_months', models.IntegerField()),
                ('listing_status', models.IntegerField(choices=[(1, 'Adopted'), (2, 'Canceled'), (3, 'Open')])),
                ('description', models.TextField()),
                ('listing_pic', models.ImageField(blank=True, null=True, upload_to='')),
                ('shelter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
