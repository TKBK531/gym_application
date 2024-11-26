from .models import UserProfile, UserType


def is_student_user(user_id):
    return check_user_type(user_id, "student")


def is_academic_user(user_id):
    return check_user_type(user_id, "academic")


def is_postgraduate_user(user_id):
    return check_user_type(user_id, "postgraduate")


def is_external_user(user_id):
    return check_user_type(user_id, "external")


def is_internal_user(user_id):
    return check_user_type(user_id, "internal")


def is_approval_user(user_id):
    return check_user_type(user_id, "approval")


def is_payment_user(user_id):
    return check_user_type(user_id, "payment")


def is_staff_user(user_id):
    return check_user_type(user_id, "staff")


def is_admin_user(user_id):
    return check_user_type(user_id, "admin")


def check_user_type(user_id, user_type_name):
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)
        return user_profile.user_type.name.lower() == user_type_name.lower()
    except UserProfile.DoesNotExist:
        return False
