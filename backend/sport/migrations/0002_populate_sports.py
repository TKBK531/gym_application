from django.db import migrations, models


def populate_sport(apps, schema_editor):
    Sport = apps.get_model("sport", "Sport")

    Sport.objects.bulk_create(
        [
            Sport(label="Badminton (Women)"),
            Sport(label="Badminton (Men)"),
            Sport(label="Baseball"),
            Sport(label="Basketball (Women)"),
            Sport(label="Basketball (Men)"),
            Sport(label="Carrom"),
            Sport(label="Chess (Women)"),
            Sport(label="Chess (Men)"),
            Sport(label="Cricket"),
            Sport(label="Elle (Women)"),
            Sport(label="Elle (Men)"),
            Sport(label="Football"),
            Sport(label="Hockey (Women)"),
            Sport(label="Karate (Women)"),
            Sport(label="Karate (Men)"),
            Sport(label="Kick Boxing"),
            Sport(label="Netball"),
            Sport(label="Power Lifting"),
            Sport(label="Road Race"),
            Sport(label="Rugby Football"),
            Sport(label="Taekwondo (Women)"),
            Sport(label="Taekwondo (Men)"),
            Sport(label="Track & Field (Men & Women)"),
            Sport(label="Track & Field (Men)"),
            Sport(label="Swimming (Men)"),
            Sport(label="Table Tennis (Women)"),
            Sport(label="Table Tennis (Men)"),
            Sport(label="Tennis (Men)"),
            Sport(label="Volleyball (Women)"),
            Sport(label="Volleyball (Men)"),
            Sport(label="Weight Lifting"),
            Sport(label="Wrestling"),
        ]
    )


def reverse_populate_sport(apps, schema_editor):
    Sport = apps.get_model("sport", "Sport")
    Sport.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        (
            "sport",
            "0001_initial",
        ),  # Update this with the actual initial migration file name
    ]

    operations = [
        migrations.RunPython(
            populate_sport,
            reverse_populate_sport,
        ),
    ]
