from django.db import migrations


def create_faculty_data(apps, schema_editor):
    Faculty = apps.get_model("userProfile", "Faculty")  # Replace 'your_app_name'
    Faculty.objects.bulk_create(
        [
            Faculty(name="Science", code="sci"),
            Faculty(name="Engineering", code="eng"),
            Faculty(name="Arts", code="arts"),
            Faculty(name="Medicine", code="med"),
            Faculty(name="Management", code="mgt"),
            Faculty(name="Veterinary Medicine and Animal Science", code="vet"),
            Faculty(name="Dental Sciences", code="dental"),
            Faculty(name="Agriculture", code="agri"),
            Faculty(name="Allied Health Science", code="ahs"),
        ]
    )


def delete_faculty_data(apps, schema_editor):
    Faculty = apps.get_model("userProfile", "Faculty")
    Faculty.objects.filter(
        faculty_code__in=[
            "sci",
            "eng",
            "arts",
            "med",
            "mgt",
            "vet",
            "dental",
            "agri",
            "ahs",
        ]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        # Ensure your app is named correctly here
        (
            "userProfile",
            "0005_populate_groups",
        ),  # Or whatever your initial migration was
    ]
    operations = [
        migrations.RunPython(create_faculty_data, delete_faculty_data),
    ]
