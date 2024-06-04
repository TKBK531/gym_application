from django.db import migrations, models


def populate_city(apps, schema_editor):
    City = apps.get_model("userProfile", "City")
    City.objects.bulk_create(
        [
            City(pk=1, label="Kandy", province_id=1),
            City(pk=2, label="Matale", province_id=1),
            City(pk=3, label="Nuwara Eliya", province_id=1),
            City(pk=4, label="Trincomalee", province_id=2),
            City(pk=5, label="Batticaloa", province_id=2),
            City(pk=6, label="Ampara", province_id=2),
            City(pk=7, label="Anuradhapura", province_id=3),
            City(pk=8, label="Polonnaruwa", province_id=3),
            City(pk=9, label="Jaffna", province_id=4),
            City(pk=10, label="Kilinochchi", province_id=4),
            City(pk=11, label="Mannar", province_id=4),
            City(pk=12, label="Vavuniya", province_id=4),
            City(pk=13, label="Mullaitivu", province_id=4),
            City(pk=14, label="Kurunegala", province_id=5),
            City(pk=15, label="Puttalam", province_id=5),
            City(pk=16, label="Ratnapura", province_id=6),
            City(pk=17, label="Kegalle", province_id=6),
            City(pk=18, label="Galle", province_id=7),
            City(pk=19, label="Matara", province_id=7),
            City(pk=20, label="Hambantota", province_id=7),
            City(pk=21, label="Badulla", province_id=8),
            City(pk=22, label="Monaragala", province_id=8),
            City(pk=23, label="Colombo", province_id=9),
            City(pk=24, label="Gampaha", province_id=9),
            City(pk=25, label="Kalutara", province_id=9),
        ]
    )


def reverse_populate_city(apps, schema_editor):
    City = apps.get_model("userProfile", "City")
    City.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        (
            "userProfile",
            "0003_populate_province_data",
        ),
    ]

    operations = [
        migrations.RunPython(
            populate_city,
            reverse_populate_city,
        ),
    ]
