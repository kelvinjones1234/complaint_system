# Generated by Django 5.0 on 2024-09-01 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("complain_app", "0006_remove_complaint_status_feedback_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="feedback",
            name="message",
            field=models.TextField(blank=True, null=True),
        ),
    ]
