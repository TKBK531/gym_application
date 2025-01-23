from django.contrib import admin
from .models import (
    Members,
    PostgraduateMember,
    AcademicStaffMember,
    OutsidersMember,
    Family,
    FamilyMembers,
)

# Register Members model with a custom admin class
@admin.register(Members)
class MembersAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "age", "household", "membership", "residence", "price",)
    list_filter = ("membership",)  # Filters for membership type
    search_fields = ("user__username", "household",)  # Search by username and household


# Register PostgraduateMember model
@admin.register(PostgraduateMember)
class PostgraduateMemberAdmin(admin.ModelAdmin):
    list_display = ("id", 
                    "members", 
                    "pg_name", 
                    "stu_reg_no",
                    )
    search_fields = ("pg_name", 
                     "stu_reg_no", 
                     "members__user__username",
                    )


# Register AcademicStaffMember model
@admin.register(AcademicStaffMember)
class AcademicStaffMemberAdmin(admin.ModelAdmin):
    list_display = ("id", 
                    "members", 
                    "designation", 
                    "temporary",
                    )
    search_fields = ("designation", 
                     "members__user__username",
                     )


# Register OutsidersMember model
@admin.register(OutsidersMember)
class OutsidersMemberAdmin(admin.ModelAdmin):
    list_display = ("id", 
                    "members",
                    )
    search_fields = ("members__user__username",)


# Register Family model
@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ("id", 
                    "members",
                    )
    search_fields = ("members__user__username",)


# Register FamilyMembers model
@admin.register(FamilyMembers)
class FamilyMembersAdmin(admin.ModelAdmin):
    list_display = ("id", "family", "name", "nic", "relationship", "age",)
    search_fields = ("name", "nic", "relationship", "family__members__user__username",)
