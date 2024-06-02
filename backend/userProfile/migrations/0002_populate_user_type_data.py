from django.db import migrations
from userProfile.models import UserType


def populate_usertype(apps, schema_editor):
    UserType.objects.bulk_create(
        [
            UserType(name="internal"),
            UserType(name="external"),
            UserType(name="staff"),
            UserType(name="admin"),
        ]
    )


def reverse_populate_usertype(apps, schema_editor):
    usertype_model = apps.get_model("userProfile", "usertype")
    usertype_model.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("userProfile", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            populate_usertype,
            reverse_populate_usertype,
        ),
    ]
