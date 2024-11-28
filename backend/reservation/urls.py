from django.urls import path
from .views import (AllFacilitiesView, AddFacilityView, DeleteFacilityView, 
                    AllCourtsView, AddCourtView, DeleteCourtView)


urlpatterns = [
    path(
        "requestAllFacilities/",
        AllFacilitiesView.as_view(),
        name="all-facilities",
    ),
    path(
        "addFacility/",
        AddFacilityView.as_view(),
        name="new_facility"
    ),
    path(
        "deleteFacility/",
        DeleteFacilityView.as_view(),
        name="delete_facility"
    ),

    path(
        "requestAllCourts/",
        AllCourtsView.as_view(),
        name="all-courts",
    ),
    path(
        "addCourt/",
        AddCourtView.as_view(),
        name="new_court"
    ),
    path(
        "deleteCourt/",
        DeleteCourtView.as_view(),
        name="delete_court"
    ),


]
