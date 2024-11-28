from rest_framework.views import APIView
from .models import Reservation, Facility, Court, ReservationRequest, CourtRate
from .serializers import ReservationSerializer, FacilitySerializer, CourtSerializer, ReservationRequestSerializer, CourtRateSerializer
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.db import transaction


#Facility views-------------------------------------------------------------------
#return all Facilities
class AllFacilitiesView(APIView):
    def get(self, request):
        facilities = Facility.objects.all()
        serializer = FacilitySerializer(facilities, many=True)
        return Response(serializer.data)
    
#Add Facility
class AddFacilityView(APIView):
    def post(self, request):
        facility_name = request.data.get("facility_name")
        
        # Check if a facility with the same name already exists
        if Facility.objects.filter(facility_name=facility_name).exists():
            return Response(
                {"error": f"A facility with the name '{facility_name}' already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = FacilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
#Delete facility
class DeleteFacilityView(APIView):
    def delete(self, request):
        facility_name = request.data.get("facility_name")
        
        # Check if facility_name is provided
        if not facility_name:
            return Response(
                {"error": "Facility name is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            facility = Facility.objects.get(facility_name__iexact=facility_name)

            # Check if any courts reference this facility
            if Court.objects.filter(facility=facility).exists():
                return Response(
                    {
                        "error": "Cannot delete facility",
                        "details": f"Facility '{facility_name}' is referenced by one or more courts."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Delete the facility if no references are found
            facility.delete()
            return Response(
                {"message": f"Facility '{facility_name}' has been deleted successfully."},
                status=status.HTTP_200_OK
            )

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )



#Court Views------------------------------------------------------------------------------
#return all courts
class AllCourtsView(APIView):
    def get(self, request):
        courts = Court.objects.all()
        serializer = CourtSerializer(courts, many=True)
        return Response(serializer.data)

#Add Court
class AddCourtView(APIView):
    def post(self, request):
        court_name = request.data.get("court_name")
        facility_name = request.data.get("facility_name")
        
        # Validate inputs
        if not court_name or not facility_name:
            return Response(
                {"error": "Both court_name and facility_name are required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            facility = Facility.objects.get(facility_name__iexact=facility_name)
            
            if Court.objects.filter(court_name__iexact=court_name, facility=facility).exists():
                return Response(
                    {
                        "error": "Cannot add court",
                        "details": f"A court with the name '{court_name}' already exists in the facility '{facility_name}'."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Add the facility to the data to pass to the serializer
            request.data['facility'] = facility.facility_id 

            # Create the court instance manually with the facility reference
            serializer = CourtSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  # Facility is already added to the data
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

#delete Court
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
            if ReservationRequest.objects.filter(court=court, date__gte=datetime.now()).exists():
                return Response(
                    {"error": "Cannot delete court",
                     "details": f"Court '{court_name}' in facility '{facility_name}' is referenced by future reservation requests."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if there are any future reservations referencing this court
            if Reservation.objects.filter(court=court, date__gte=datetime.now()).exists():
                return Response(
                    {"error": "Cannot delete court",
                     "details": f"Court '{court_name}' in facility '{facility_name}' is referenced by future reservations."},
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
                {"message": f"Court '{court_name}' in facility '{facility_name}' has been deleted successfully."},
                status=status.HTTP_200_OK,
            )

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Court.DoesNotExist:
            return Response(
                {"error": f"Court '{court_name}' in facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

       
#Court Rate Views--------------------------------------------------------------------------------------------------------- 
#return all court Rates or filter by the court 
class AllCourtRatesView(APIView):
    def get(self, request):
        court_name = request.query_params.get("court_name")
        facility_name = request.query_params.get("facility_name")

        try:
            court_rates = CourtRate.objects.all()

            # Filter by facility and court if parameters are provided
            if facility_name and court_name:
                facility = Facility.objects.get(facility_name__iexact=facility_name)
                court = Court.objects.get(court_name__iexact=court_name, facility=facility)
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


#Add court Rate
class AddCourtRateView(APIView):
    def post(self, request):
        court_name = request.data.get("court_name")
        facility_name = request.data.get("facility_name")
        rate = request.data.get("rate")  # The rate of the court, assumed to be part of the request

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
                is_gov=is_gov
            ).exists():
                return Response(
                    {"error": "Court rate already exists for this court with the same conditions."},
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
                is_gov=is_gov
            )

            return Response(
                {"message": f"Court rate for court '{court_name}' in facility '{facility_name}' has been added successfully.",
                 "court_rate_id": court_rate.court_rate_id, "rate": court_rate.rate},
                status=status.HTTP_201_CREATED,
            )

        except Facility.DoesNotExist:
            return Response(
                {"error": f"Facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Court.DoesNotExist:
            return Response(
                {"error": f"Court '{court_name}' in facility '{facility_name}' not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

#Delete court rate
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
                facility__facility_name__iexact=facility_name
            )

            # Filter court rates matching the specified court
            court_rates = CourtRate.objects.filter(court=court)

            # Further filter based on other provided criteria
            filters = {key: request.data.get(key, None) for key in ["activity", "duration", "is_competitive", "is_foreign", "is_school", "is_gov"]}
            for key, value in filters.items():
                if value is not None:
                    if key in ["is_competitive", "is_foreign", "is_school", "is_gov"]:
                        value = value.lower() == 'true'  # Convert string "true"/"false" to boolean
                    court_rates = court_rates.filter(**{key: value})

            # If multiple records match, return a prompt to specify further
            if court_rates.count() > 1:
                matches = court_rates.values("court_rate_id", "activity", "duration", "is_competitive", "is_foreign", "is_school", "is_gov", "rate")
                return Response(
                    {
                        "error": "Multiple court rates match the given criteria. Please be more specific.",
                        "matching_court_rates": list(matches)
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # If no records match
            if not court_rates.exists():
                return Response(
                    {"error": "No matching court rates found for the specified criteria."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Delete the single matching court rate
            court_rate = court_rates.first()
            court_rate_id = court_rate.court_rate_id
            court_rate.delete()
            return Response(
                {"message": f"Court rate with ID {court_rate.court_rate_id} deleted successfully."},
                status=status.HTTP_200_OK,
            )

        except Court.DoesNotExist:
            return Response(
                {"error": "Court not found", "details": f"No court with name '{court_name}' in facility '{facility_name}'."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

