from rest_framework.views import APIView
from .models import (
    Reservation,
    Facility,
    Court,
    ReservationRequest,
    CourtRate,
    ReservationDate,
    ReservationParticipant,
)
from .serializers import (
    FacilitySerializer,
    CourtSerializer,
    CourtRateSerializer,
    ReservationRequestSerializer,
    ReservationDateSerializer,
    ReservationSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from django.db import transaction
from django.utils.dateparse import parse_date
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, CreateAPIView
from django.utils import timezone
import logging
from django.http import JsonResponse


# Facility views-------------------------------------------------------------------------------------------------------------------------------------------------
# return all Facilities
class AllFacilitiesView(APIView):
    def get(self, request):
        facilities = Facility.objects.all()
        serializer = FacilitySerializer(facilities, many=True)
        return Response(serializer.data)


# Add Facility
class AddFacilityView(APIView):
    def post(self, request):
        facility_name = request.data.get("facility_name")

        # Check if a facility with the same name already exists
        if Facility.objects.filter(facility_name=facility_name).exists():
            return Response(
                {
                    "error": f"A facility with the name '{facility_name}' already exists."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = FacilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete facility
class DeleteFacilityView(APIView):
    def delete(self, request):
        facility_name = request.data.get("facility_name")

        # Check if facility_name is provided
        if not facility_name:
            return Response(
                {"error": "Facility name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            facility = Facility.objects.get(facility_name__iexact=facility_name)

            # Check if any courts reference this facility
            if Court.objects.filter(facility=facility).exists():
                return Response(
                    {
                        "error": "Cannot delete facility",
                        "details": f"Facility '{facility_name}' is referenced by one or more courts.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Delete the facility if no references are found
            facility.delete()
            return Response(
                {
                    "message": f"Facility '{facility_name}' has been deleted successfully."
                },
                status=status.HTTP_200_OK,
            )

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )


# Court Views-----------------------------------------------------------------------------------------------------------------------------------------------------
# return all courts
class AllCourtsView(APIView):
    def get(self, request):
        courts = Court.objects.all()
        serializer = CourtSerializer(courts, many=True)
        return Response(serializer.data)


# Add Court
class AddCourtView(APIView):
    def post(self, request):
        court_name = request.data.get("court_name")
        facility_name = request.data.get("facility_name")

        # Validate inputs
        if not court_name or not facility_name:
            return Response(
                {"error": "Both court_name and facility_name are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            facility = Facility.objects.get(facility_name__iexact=facility_name)

            if Court.objects.filter(
                court_name__iexact=court_name, facility=facility
            ).exists():
                return Response(
                    {
                        "error": "Cannot add court",
                        "details": f"A court with the name '{court_name}' already exists in the facility '{facility_name}'.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Add the facility to the data to pass to the serializer
            request.data["facility"] = facility.facility_id

            # Create the court instance manually with the facility reference
            serializer = CourtSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  # Facility is already added to the data
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )


# delete Court
class DeleteCourtView(APIView):
    def delete(self, request):
        court_name = request.data.get("court_name")
        facility_name = request.data.get("facility_name")

        if not court_name or not facility_name:
            return Response(
                {"error": "Both court_name and facility_name are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            facility = Facility.objects.get(facility_name__iexact=facility_name)
            court = Court.objects.get(court_name__iexact=court_name, facility=facility)

            # Check if there are any future reservation requests referencing this court
            if ReservationRequest.objects.filter(court=court).exists():
                return Response(
                    {
                        "error": "Cannot delete court",
                        "details": f"Court '{court_name}' in facility '{facility_name}' is referenced by future reservation requests.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if there are any future reservations referencing this court
            if Reservation.objects.filter(court=court).exists():
                return Response(
                    {
                        "error": "Cannot delete court",
                        "details": f"Court '{court_name}' in facility '{facility_name}' is referenced by future reservations.",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Begin a transaction to ensure all deletions happen atomically
            with transaction.atomic():
                # Delete the court rates associated with this court
                court_rates = CourtRate.objects.filter(court=court)
                court_rates.delete()

                # Delete the court itself
                court.delete()

            return Response(
                {
                    "message": f"Court '{court_name}' in facility '{facility_name}' has been deleted successfully."
                },
                status=status.HTTP_200_OK,
            )

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Court.DoesNotExist:
            return Response(
                {
                    "error": f"Court '{court_name}' in facility '{facility_name}' not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Court Rate Views--------------------------------------------------------------------------------------------------------------------------------------------------
# return all court Rates
class AllCourtRatesView(APIView):
    def get(self, request):
        court_name = request.query_params.get("court_name")
        facility_name = request.query_params.get("facility_name")

        try:
            court_rates = CourtRate.objects.all()

            # Filter by facility and court if parameters are provided
            if facility_name and court_name:
                facility = Facility.objects.get(facility_name__iexact=facility_name)
                court = Court.objects.get(
                    court_name__iexact=court_name, facility=facility
                )
                court_rates = court_rates.filter(court=court)

            elif facility_name:
                facility = Facility.objects.get(facility_name__iexact=facility_name)
                courts = Court.objects.filter(facility=facility)
                court_rates = court_rates.filter(court__in=courts)

            elif court_name:
                court_rates = court_rates.filter(court__court_name__iexact=court_name)

            # Serialize the queryset
            serializer = CourtRateSerializer(court_rates, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Court.DoesNotExist:
            return Response(
                {"error": f"Court '{court_name}' not found in the specified facility."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Add court Rate
class AddCourtRateView(APIView):
    def post(self, request):
        court_name = request.data.get("court_name")
        facility_name = request.data.get("facility_name")
        rate = request.data.get(
            "rate"
        )  # The rate of the court, assumed to be part of the request

        # Default values for optional fields
        activity = request.data.get("activity", "none")
        duration = request.data.get("duration", "per hour")
        is_competitive = request.data.get("is_competitive", False)
        is_foreign = request.data.get("is_foreign", False)
        is_school = request.data.get("is_school", False)
        is_gov = request.data.get("is_gov", False)

        # Validate required fields
        if not court_name or not facility_name or not rate:
            return Response(
                {"error": "Court name, facility name, and rate are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            facility = Facility.objects.get(facility_name__iexact=facility_name)
            court = Court.objects.get(court_name__iexact=court_name, facility=facility)

            # Check if a CourtRate with the same activity, duration, and other fields already exists for this court
            if CourtRate.objects.filter(
                court=court,
                activity=activity,
                duration=duration,
                is_competitive=is_competitive,
                is_foreign=is_foreign,
                is_school=is_school,
                is_gov=is_gov,
            ).exists():
                return Response(
                    {
                        "error": "Court rate already exists for this court with the same conditions."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # If no matching CourtRate exists, create a new CourtRate
            court_rate = CourtRate.objects.create(
                court=court,
                rate=rate,
                activity=activity,
                duration=duration,
                is_competitive=is_competitive,
                is_foreign=is_foreign,
                is_school=is_school,
                is_gov=is_gov,
            )

            return Response(
                {
                    "message": f"Court rate for court '{court_name}' in facility '{facility_name}' has been added successfully.",
                    "court_rate_id": court_rate.court_rate_id,
                    "rate": court_rate.rate,
                },
                status=status.HTTP_201_CREATED,
            )

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Court.DoesNotExist:
            return Response(
                {
                    "error": f"Court '{court_name}' in facility '{facility_name}' not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Delete court rate
class DeleteCourtRateView(APIView):
    def delete(self, request):
        court_name = request.data.get("court_name")
        facility_name = request.data.get("facility_name")

        if not court_name or not facility_name:
            return Response(
                {"error": "Both 'court_name' and 'facility_name' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Retrieve the matching court with case-insensitive search
            court = Court.objects.get(
                court_name__iexact=court_name,
                facility__facility_name__iexact=facility_name,
            )

            # Filter court rates matching the specified court
            court_rates = CourtRate.objects.filter(court=court)

            # Further filter based on other provided criteria
            filters = {
                key: request.data.get(key, None)
                for key in [
                    "activity",
                    "duration",
                    "is_competitive",
                    "is_foreign",
                    "is_school",
                    "is_gov",
                ]
            }
            for key, value in filters.items():
                if value is not None:
                    if key in ["is_competitive", "is_foreign", "is_school", "is_gov"]:
                        value = (
                            value.lower() == "true"
                        )  # Convert string "true"/"false" to boolean
                    court_rates = court_rates.filter(**{key: value})

            # If multiple records match, return a prompt to specify further
            if court_rates.count() > 1:
                matches = court_rates.values(
                    "court_rate_id",
                    "activity",
                    "duration",
                    "is_competitive",
                    "is_foreign",
                    "is_school",
                    "is_gov",
                    "rate",
                )
                return Response(
                    {
                        "error": "Multiple court rates match the given criteria. Please be more specific.",
                        "matching_court_rates": list(matches),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # If no records match
            if not court_rates.exists():
                return Response(
                    {
                        "error": "No matching court rates found for the specified criteria."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Delete the single matching court rate
            court_rate = court_rates.first()
            court_rate_id = court_rate.court_rate_id
            court_rate.delete()
            return Response(
                {
                    "message": f"Court rate with ID {court_rate_id} deleted successfully."
                },
                status=status.HTTP_200_OK,
            )

        except Court.DoesNotExist:
            return Response(
                {
                    "error": "Court not found",
                    "details": f"No court with name '{court_name}' in facility '{facility_name}'.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Reservation Request Views--------------------------------------------------------------------------------------------------------------------------------------------------
# return all reservation requests
class AllReservationRequestsView(APIView):
    def get(self, request):
        reservation_requests = ReservationRequest.objects.all()
        serializer = ReservationRequestSerializer(reservation_requests, many=True)
        return Response(serializer.data)


# logger = logging.getLogger(__name__)
# Add reservationRequest
class AddReservationRequestView(APIView):
    def post(self, request):
        data = request.data

        # Log the incoming request data
        # print("Incoming reservation request data: %s", data, flush=True)

        # Extract and normalize rate_type
        rate_type = data.get("rate_type")
        # print("Rate type received:", rate_type, flush=True)
        if rate_type not in dict(ReservationRequest.RATE_TYPE_CHOICES):
            return Response(
                {
                    "error": f"Invalid rate_type '{rate_type}'. Expected 'hourly_rate' or 'day_rate'."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Extract facility and court
        facility_name = data.get("facility_name")
        court_name = data.get("court_name")
        court = get_object_or_404(
            Court,
            facility__facility_name__iexact=facility_name,
            court_name__iexact=court_name,
        )

        # Prepare reservation data
        reservation_data = {
            "email": data.get("email"),
            "court": court.court_id,
            "activity": data.get("activity"),
            "rate_type": rate_type,
            "num_of_courts": data.get("num_of_courts", 1),
            "user": request.user.id,
            "requirement": data.get("requirement", ""),
            "is_school": data.get("is_school", False),
            "is_gov": data.get("is_gov", False),
            "is_foreign": data.get("is_foreign", False),
            "is_competitive": data.get("is_competitive", False),
            "org_name": data.get("org_name", ""),
            "is_pdn": data.get("is_pdn", False),
            "num_of_participants": data.get("num_of_participants", 0),
            "status": "pending",
            "amount": 0,
        }

        # Transaction to ensure atomicity
        with transaction.atomic():
            # Initialize amount
            amount = 0
            all_court_rates_found = True

            # Process reservation dates
            dates = data.get("dates", [])
            for date_entry in dates:
                reservation_date = parse_date(date_entry.get("date"))

                # Calculate amount for hourly rate
                if rate_type == "hourly_rate":
                    start_time = date_entry.get("start_time")
                    end_time = date_entry.get("end_time")

                    start = datetime.strptime(start_time, "%H:%M:%S")
                    end = datetime.strptime(end_time, "%H:%M:%S")
                    duration_hours = (end - start).seconds / 3600

                    court_rate = CourtRate.objects.filter(
                        court=court,
                        activity=reservation_data["activity"],
                        duration="per hour",
                        is_school=reservation_data["is_school"],
                        is_gov=reservation_data["is_gov"],
                        is_foreign=reservation_data["is_foreign"],
                        is_competitive=reservation_data["is_competitive"],
                    ).first()

                    if court_rate:
                        amount += (
                            duration_hours
                            * court_rate.rate
                            * reservation_data["num_of_courts"]
                        )
                    else:
                        all_court_rates_found = False
                        break

                # Calculate amount for day rate
                elif rate_type == "day_rate":
                    duration_type = date_entry.get("duration_type")
                    duration_label = (
                        "per full day"
                        if duration_type == "full_day"
                        else "per half day"
                    )

                    court_rate = CourtRate.objects.filter(
                        court=court,
                        activity=reservation_data["activity"],
                        duration=duration_label,
                        is_school=reservation_data["is_school"],
                        is_gov=reservation_data["is_gov"],
                        is_foreign=reservation_data["is_foreign"],
                        is_competitive=reservation_data["is_competitive"],
                    ).first()

                    if court_rate:
                        amount += court_rate.rate * reservation_data["num_of_courts"]
                    else:
                        all_court_rates_found = False
                        break

            if not all_court_rates_found:
                return Response(
                    {
                        "error": "No matching CourtRate found for one or more of the provided dates."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create ReservationRequest
            reservation_request_serializer = ReservationRequestSerializer(
                data=reservation_data
            )
            if reservation_request_serializer.is_valid():
                reservation_request = reservation_request_serializer.save()
            else:
                return Response(
                    {
                        "error": "Reservation request data is invalid.",
                        "details": reservation_request_serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create ReservationDates
            for date_entry in dates:
                ReservationDate.objects.create(
                    reservation_request=reservation_request,
                    date=parse_date(date_entry.get("date")),
                    start_time=(
                        date_entry.get("start_time")
                        if rate_type == "hourly_rate"
                        else None
                    ),
                    end_time=(
                        date_entry.get("end_time")
                        if rate_type == "hourly_rate"
                        else None
                    ),
                    duration_type=(
                        date_entry.get("duration_type")
                        if rate_type == "day_rate"
                        else None
                    ),
                )

            # Create ReservationParticipants
            participants = data.get("participants", [])
            for participant in participants:
                ReservationParticipant.objects.create(
                    reservation_request=reservation_request,
                    name=participant.get("name"),
                    nic=participant.get("nic"),
                )

            # Update and save the total amount
            reservation_request.amount = amount
            reservation_request.save()

            return Response(
                {
                    "message": "Reservation request created successfully.",
                    "amount": amount,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Reservation request created successfully."},
            status=status.HTTP_201_CREATED,
        )


# Approve reservation Request and crerate reservation
class ApproveReservationRequestView(APIView):
    # permission_classes = [IsAdminUser]  # Ensure that only admins can approve the reservation request

    def post(self, request, reservation_request_id):
        reservation_request = get_object_or_404(
            ReservationRequest, res_req_id=reservation_request_id
        )

        if reservation_request.status in ["approved", "confirmed"]:
            return Response(
                {
                    "error": "This ReservationRequest has already been approved or confirmed."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update ReservationRequest status to 'approved'
        reservation_request.status = "approved"

        # Create a new Reservation
        reservation_status = "confirmed" if reservation_request.is_pdn else "approved"

        reservation = Reservation.objects.create(
            res_req=reservation_request,
            email=reservation_request.email,
            court=reservation_request.court,
            num_of_courts=reservation_request.num_of_courts,
            activity=reservation_request.activity,
            rate_type=reservation_request.rate_type,
            user=reservation_request.user,
            requirement=reservation_request.requirement,
            is_school=reservation_request.is_school,
            is_gov=reservation_request.is_gov,
            is_foreign=reservation_request.is_foreign,
            is_competitive=reservation_request.is_competitive,
            org_name=reservation_request.org_name,
            is_pdn=reservation_request.is_pdn,
            num_of_participants=reservation_request.num_of_participants,
            amount=reservation_request.amount,
            status=reservation_status,
        )

        # update the ReservationDate records associated with this ReservationRequest
        reservation_dates = ReservationDate.objects.filter(
            reservation_request=reservation_request
        )
        for reservation_date in reservation_dates:
            reservation_date.reservation = reservation
            reservation_date.save()

        reservation_participants = ReservationParticipant.objects.filter(
            reservation_request=reservation_request
        )
        for participant in reservation_participants:
            participant.reservation = reservation
            participant.save()

        reservation_request.save()

        return Response(
            {
                "message": f"ReservationRequest approved and Reservation created with status {reservation_status}."
            },
            status=status.HTTP_200_OK,
        )


# Cancel reservation Request
class CancelReservationRequestView(APIView):
    def post(self, request, reservation_request_id):
        reservation_request = get_object_or_404(
            ReservationRequest, res_req_id=reservation_request_id
        )

        if reservation_request.status == "cancelled":
            return Response(
                {"error": "This ReservationRequest is already cancelled."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update the ReservationRequest status to 'cancelled'
        reservation_request.status = "cancelled"

        # Optionally, update the status of the related Reservation to 'cancelled' (if applicable)
        if reservation_request.reservation:  # Check if there is a linked Reservation
            reservation = reservation_request.reservation
            reservation.status = "cancelled"
            reservation.save()

        # Save the updated ReservationRequest
        reservation_request.save()

        return Response(
            {"message": "ReservationRequest has been cancelled successfully."},
            status=status.HTTP_200_OK,
        )


# update reservation request(only with admin preveleges)(current version doesnt change amount)
class UpdateReservationRequestView(APIView):
    def put(self, request, reservation_request_id):
        reservation_request = get_object_or_404(
            ReservationRequest, res_req_id=reservation_request_id
        )

        serializer = ReservationRequestSerializer(
            reservation_request, data=request.data, partial=True
        )

        if serializer.is_valid():
            # Compare previous and new data to identify changes
            updated_data = {}
            for field, value in serializer.validated_data.items():
                old_value = getattr(reservation_request, field)
                if old_value != value:
                    updated_data[field] = {"old_value": old_value, "new_value": value}

            # Save the updated ReservationRequest
            serializer.save()

            return Response(
                {
                    "message": "ReservationRequest updated successfully.",
                    "updated_fields": updated_data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# reject reservation request(only with admin preveleges)
class RejectReservationRequestView(APIView):
    def post(self, request, reservation_request_id):
        reservation_request = get_object_or_404(
            ReservationRequest, res_req_id=reservation_request_id
        )

        if reservation_request.status == "rejected":
            return Response(
                {"error": "This ReservationRequest is already rejected."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update the status to 'rejected'
        reservation_request.status = "rejected"
        reservation_request.save()

        return Response(
            {"message": "ReservationRequest has been rejected successfully."},
            status=status.HTTP_200_OK,
        )


# Reservation views----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# return all reservations
class AllReservationsView(ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


# Confirm reservation
class ConfirmReservationView(APIView):
    def post(self, request, reservation_id):
        reservation = get_object_or_404(Reservation, reservation_id=reservation_id)

        # if already confirmed
        if reservation.status == "confirmed":
            return Response(
                {"message": "This reservation is already confirmed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the payment is confirmed
        # if not reservation.payment_confirmed:
        #     return Response(
        #         {'message': 'Payment has not been confirmed for this reservation.'},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )

        reservation.status = "confirmed"
        reservation.save()
        return Response(
            {"message": "Reservation confirmed successfully."},
            status=status.HTTP_200_OK,
        )


# cancel Reservation
class CancelReservationView(APIView):
    def post(self, request, reservation_id):
        reservation = get_object_or_404(Reservation, reservation_id=reservation_id)

        reservation_dates = reservation.reservation_dates.all()

        # Check if all reservation dates are eligible for cancellation (at least 4 days before the date)
        current_time = timezone.now()
        cancelation_deadline = timedelta(days=4)

        for reservation_date in reservation_dates:
            if reservation_date.date - current_time.date() < cancelation_deadline:
                return Response(
                    {
                        "message": f"Reservation cannot be cancelled for {reservation_date.date} as the cancelation period has passed."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # notify about the no-refund policy for confirmed reservations
        if reservation.status == "confirmed":
            reservation.status = "cancelled"
            reservation.save()
            return Response(
                {
                    "message": "Reservation has been successfully cancelled, but no refund will be provided for this confirmed reservation."
                },
                status=status.HTTP_200_OK,
            )

        # For other statuses(pending, approved)
        reservation.status = "cancelled"
        reservation.save()

        return Response(
            {"message": "Reservation has been successfully cancelled."},
            status=status.HTTP_200_OK,
        )


# Return Reservations by Date
logger = logging.getLogger(__name__)


class AllReservationDatesView(APIView):
    def get(self, request, date):
        logger.info("Received request for AllReservationDatesView")
        logger.info(f"Path parameter 'date': {date}")

        try:
            # Parse the date
            parsed_date = parse_date(date)
            if not parsed_date:
                logger.error(f"Invalid date format received: {date}")
                raise ValueError("Invalid date format. Use YYYY-MM-DD.")

            logger.info(f"Parsed date: {parsed_date}")

            # Query ReservationDate for the provided date
            logger.info("Querying ReservationDate for the given date")
            reservation_dates = ReservationDate.objects.filter(
                date=parsed_date
            ).select_related("reservation")

            logger.info(
                f"Number of ReservationDate objects found: {reservation_dates.count()}"
            )

            if not reservation_dates.exists():
                logger.info("No reservation dates found.")
                return Response([], status=status.HTTP_200_OK)

            # Prepare response data
            logger.info("Preparing response data")
            response_data = [
                {
                    "reservation_date_id": rd.id,
                    "date": rd.date,
                    "start_time": rd.start_time,
                    "end_time": rd.end_time,
                    "duration_type": rd.duration_type,
                    "reservation": {
                        "facility": (
                            rd.reservation_request.court.facility.facility_name
                            if rd.reservation_request
                            else None
                        ),
                        "court": (
                            rd.reservation_request.court.court_name
                            if rd.reservation_request
                            else None
                        ),
                        "org_name": (
                            rd.reservation_request.org_name
                            if rd.reservation_request
                            else None
                        ),
                        "status": (
                            rd.reservation_request.status
                            if rd.reservation_request
                            else None
                        ),
                    },
                }
                for rd in reservation_dates
            ]

            logger.info(f"Response data prepared: {response_data}")

            return Response(response_data, status=status.HTTP_200_OK)

        except ValueError as e:
            logger.error(f"ValueError: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Unexpected error occurred: {e}")
            return Response(
                {"error": "Internal server error."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# Return ReservationsDates By Court
class ReservationDatesByCourtView(APIView):

    def get(self, request, facility, court, start_date, end_date, *args, **kwargs):
        try:
            # Parse the start and end dates
            start_date = parse_date(start_date)
            end_date = parse_date(end_date)
            print(facility, court, start_date, end_date)

            if not start_date or not end_date:
                raise ValueError(
                    "Invalid date format. Use 'start_date' and 'end_date' in YYYY-MM-DD format."
                )

            if start_date > end_date:
                raise ValueError("'start_date' cannot be after 'end_date'.")

            # Filter ReservationDates by court, facility, and date range
            reservation_dates = ReservationDate.objects.filter(
                reservation_request__court__court_name__iexact=court,
                reservation_request__court__facility__facility_name__iexact=facility,
                date__range=(start_date, end_date),
            )
            print(reservation_dates)

            if not reservation_dates.exists():
                return Response([])

            # Serialize the filtered ReservationDates
            response_data = []
            for reservation_date in reservation_dates:
                reservation = reservation_date.reservation_request
                response_data.append(
                    {
                        "reservation_date_id": reservation_date.id,
                        "date": reservation_date.date,
                        "start_time": reservation_date.start_time,
                        "end_time": reservation_date.end_time,
                        "duration_type": reservation_date.duration_type,
                        "reservation": {
                            "org_name": reservation.org_name if reservation else None,
                            "status": reservation.status if reservation else None,
                        },
                    }
                )

            return Response(response_data, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ReservationsByCourt
class ReservationsByCourtView(APIView):
    def get(self, request, facility_name, court_name, *args, **kwargs):
        print(" court access  requested ", flush=True)
        try:
            facility = get_object_or_404(Facility, facility_name__iexact=facility_name)
            court = get_object_or_404(
                Court, facility=facility, court_name__iexact=court_name
            )
            print(court, flush=True)
            # Fetch all reservation dates associated with this court
            booked_slots = ReservationDate.objects.filter(
                reservation_request__court=court
                # reservation__status__in=['approved', 'pending']
            ).values("date", "start_time", "end_time", "duration_type")

            slots = [
                {
                    "date": slot["date"].isoformat(),
                    "start_time": (
                        slot["start_time"].strftime("%I:%M %p")
                        if slot["start_time"]
                        else (
                            "08:00 AM"
                            if slot["duration_type"] == "full_day"
                            else "12:00 PM"
                        )
                    ),
                    "end_time": (
                        slot["end_time"].strftime("%I:%M %p")
                        if slot["end_time"]
                        else (
                            "04:00 PM"
                            if slot["duration_type"] in ["full_day", "half_day"]
                            else None
                        )
                    ),
                }
                for slot in booked_slots
            ]

            return JsonResponse(slots, safe=False)

        except Facility.DoesNotExist:
            return JsonResponse({"error": "Facility not found"}, status=404)
        except Court.DoesNotExist:
            return JsonResponse({"error": "Court not found"}, status=404)
