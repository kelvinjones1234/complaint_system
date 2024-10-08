# Generated by Django 5.0 on 2024-09-12 03:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("complain_app", "0008_complaint_attachment"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="complaint",
            options={"verbose_name_plural": "Complaints"},
        ),
        migrations.AlterModelOptions(
            name="complaintcategory",
            options={"verbose_name_plural": "Complaint Categories"},
        ),
        migrations.RenameField(
            model_name="complaint",
            old_name="attachment",
            new_name="file",
        ),
    ]
