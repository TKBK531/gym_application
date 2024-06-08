from django.db import migrations


def populate_groups(apps, schema_editor):
    Group = apps.get_model("auth", "Group")
    Group.objects.bulk_create(
        [
            Group(name="admin"),
            Group(name="staff"),
            Group(name="external"),
            Group(name="internal"),
        ]
    )


def reverse_populate_groups(apps, schema_editor):
    Group = apps.get_model("auth", "Group")
    Group.objects.filter(name__in=["admin", "staff", "external", "internal"]).delete()


class Migration(migrations.Migration):

    dependencies = [
        (
            "userProfile",
            "0004_populate_city_data",
        ),
    ]

    operations = [
        migrations.RunPython(populate_groups, reverse_populate_groups),
    ]
