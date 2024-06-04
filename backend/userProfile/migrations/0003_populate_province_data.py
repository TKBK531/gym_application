from django.db import migrations, models


def populate_province(apps, schema_editor):
    Province = apps.get_model("userProfile", "Province")
    Province.objects.bulk_create(
        [
            Province(pk=1, label="Central"),
            Province(pk=2, label="Eastern"),
            Province(pk=3, label="North Central"),
            Province(pk=4, label="Northern"),
            Province(pk=5, label="North Western"),
            Province(pk=6, label="Sabaragamuwa"),
            Province(pk=7, label="Southern"),
            Province(pk=8, label="Uva"),
            Province(pk=9, label="Western"),
        ]
    )


def reverse_populate_province(apps, schema_editor):
    Province = apps.get_model("userProfile", "Province")
    Province.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("userProfile", "0002_populate_user_type_data"),
    ]

    operations = [
        migrations.RunPython(populate_province, reverse_populate_province),
    ]
