# Generated by Django 5.0 on 2024-09-12 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("complain_app", "0009_alter_complaint_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="complaint",
            name="file",
            field=models.FileField(blank=True, null=True, upload_to=""),
        ),
    ]
