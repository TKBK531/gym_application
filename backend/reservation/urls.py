from django.urls import path
from .views import (AllFacilitiesView, AddFacilityView, DeleteFacilityView, 
                    AllCourtsView, AddCourtView, DeleteCourtView,
                    AllCourtRatesView, AddCourtRateView, DeleteCourtRateView,
                    AllReservationRequestsView,AddReservationRequestView, ApproveReservationRequestView, 
                    CancelReservationRequestView, UpdateReservationRequestView, RejectReservationRequestView,
                    AllReservationsView,ConfirmReservationView, CancelReservationView,
                    AllReservationDatesView, ReservationDatesByCourtView, ReservationsByCourtView)


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

#-----------------------------------------------------------------------
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

#-----------------------------------------------------------------------
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

#-----------------------------------------------------------------------
    path(
        "requestAllReservationRequests/",
        AllReservationRequestsView.as_view(),
        name="all-reservation-requests",
    ),
    path(
        "addReservationRequest/",
        AddReservationRequestView.as_view(),
        name="new_reservation_request"    
    ),
    path('approveReservationRequest/<int:reservation_request_id>/', 
         ApproveReservationRequestView.as_view(), 
         name='approve_reservation_request'
    ),
    path('cancelReservationRequest/<int:reservation_request_id>/', 
         CancelReservationRequestView.as_view(), 
         name='cancel_reservation_request'
    ),
    path('updateReservationRequest/<int:reservation_request_id>/', 
         UpdateReservationRequestView.as_view(), 
         name='update_reservation_request'
    ),
    path('rejectReservationRequest/<int:reservation_request_id>/', 
         RejectReservationRequestView.as_view(), 
         name='reject_reservation_request'
    ),

#-----------------------------------------------------------------------
    path(
        "requestAllReservations/",
        AllReservationsView.as_view(),
        name="all-reservations",
    ),
        path(
        "confirmReservation/<int:reservation_id>/",
        ConfirmReservationView.as_view(),
        name="confirm_reservation"    
    ),
        path(
        "cancelReservation/<int:reservation_id>/",
        CancelReservationView.as_view(),
        name="cancel_reservation"    
    ),

#-------------------------------------------------------------------------------
    path(
        "requestAllReservationDates/<str:date>/",
        AllReservationDatesView.as_view(),
        name="all-reservation-dates",    
    ),
    path(
        "requestReservationDatesByCourt/<str:facility>/<str:court>/<str:start_date>/<str:end_date>/",
        ReservationDatesByCourtView.as_view(),
        name="reservation-dates-by-courts",    
    ),
    path(
        "requestReservationsByCourt/<str:facility_name>/<str:court_name>/",
        ReservationsByCourtView.as_view(),
        name="reservations-by-court",    
    ),
]
