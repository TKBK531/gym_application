from django.db import migrations


def populate_membership_price(apps, schema_editor):
    MembershipPrice = apps.get_model("member", "MembershipPrice")  # Replace "your_app_name" with your app name.

    MembershipPrice.objects.bulk_create(
        [
            MembershipPrice(
                membershipType="pool",
                formType="staff",
                membership_fee=1000.00,
                monthly_fee=500.00,
            ),
            MembershipPrice(
                membershipType="pool",
                formType="outsiders",
                membership_fee=1500.00,
                monthly_fee=600.00,
            ),
            MembershipPrice(
                membershipType="pool",
                formType="postGraduate",
                membership_fee=1200.00,
                monthly_fee=550.00,
            ),
            MembershipPrice(
                membershipType="ground",
                formType="staff",
                membership_fee=800.00,
                monthly_fee=400.00,
            ),
            MembershipPrice(
                membershipType="ground",
                formType="outsiders",
                membership_fee=1000.00,
                monthly_fee=450.00,
            ),
            MembershipPrice(
                membershipType="ground",
                formType="postGraduate",
                membership_fee=900.00,
                monthly_fee=420.00,
            ),
            MembershipPrice(
                membershipType="gymnasium",
                formType="staff",
                membership_fee=1200.00,
                monthly_fee=600.00,
            ),
            MembershipPrice(
                membershipType="gymnasium",
                formType="outsiders",
                membership_fee=1600.00,
                monthly_fee=750.00,
            ),
            MembershipPrice(
                membershipType="gymnasium",
                formType="postGraduate",
                membership_fee=1400.00,
                monthly_fee=700.00,
            ),
        ]
    )


def reverse_populate_membership_price(apps, schema_editor):
    MembershipPrice = apps.get_model("member", "MembershipPrice")  
    MembershipPrice.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("member", "0001_initial"),  
    ]

    operations = [
        migrations.RunPython(
            populate_membership_price,
            reverse_populate_membership_price,
        ),
    ]
