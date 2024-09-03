# Generated by Django 5.0 on 2024-09-01 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("complain_app", "0005_delete_notification"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="complaint",
            name="status",
        ),
        migrations.AddField(
            model_name="feedback",
            name="status",
            field=models.CharField(
                choices=[
                    ("received", "Received"),
                    ("in_review", "In Review"),
                    ("reviewed", "Reviewed"),
                ],
                default="received",
                max_length=20,
            ),
        ),
    ]
