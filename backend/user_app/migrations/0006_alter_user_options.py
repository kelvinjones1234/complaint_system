# Generated by Django 5.0 on 2024-09-12 03:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user_app", "0005_user_phone"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={"verbose_name": "user", "verbose_name_plural": "Registered User"},
        ),
    ]
