from django.urls import path
from .views import (AllFacilitiesView, AddFacilityView, DeleteFacilityView, 
                    AllCourtsView, AddCourtView, DeleteCourtView,
                    AllCourtRatesView, AddCourtRateView, DeleteCourtRateView)


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

        path(
        "requestAllCourtRates/",
        AllCourtRatesView.as_view(),
        name="all-court-rates",
    ),
    path(
        "addCourtRate/",
        AddCourtRateView.as_view(),
        name="new_court_rate",
    ),
    path(
        "deleteCourtRate/",
        DeleteCourtRateView.as_view(),
        name="delete_court_rate",
    ),


]
