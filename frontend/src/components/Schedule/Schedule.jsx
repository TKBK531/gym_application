import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import api from "../../api";

function Schedule() {
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [courts, setCourts] = useState([]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 21; hour++) {
      const startHour = hour.toString().padStart(2, "0"); // Ensure 2-digit hour
      const endHour = (hour + 1).toString().padStart(2, "0");
      slots.push(`${startHour}:00 - ${endHour}:00`);
    }
    return slots;
  };
  

  const timeSlots = generateTimeSlots();

  const fetchCourts = async () => {
    try {
      const [facilitiesResponse, courtsResponse] = await Promise.all([
        api.get("/reservation/requestAllFacilities/"),
        api.get("/reservation/requestAllCourts/"),
      ]);
  
      const facilities = facilitiesResponse.data;
      const courts = courtsResponse.data;
  
      // Create a map of facility IDs to facility names
      const facilityMap = facilities.reduce((map, facility) => {
        map[facility.facility_id] = facility.facility_name;
        return map;
      }, {});
  
      // Map each court to an object with facilityName and courtName
      const mappedFacilityCourts = courts.map((court) => ({
        facilityName: facilityMap[court.facility] || "Unknown Facility",
        courtName: court.court_name,
      }));
  
      setCourts(mappedFacilityCourts);
    } catch (error) {
      console.error("Failed to fetch facilities or courts:", error);
    }
  };
  


  const fetchReservationsByDate = async (date) => {
    try {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const apiUrl = `/reservation/requestAllReservationDates/${formattedDate}/`;
  
      const response = await api.get(apiUrl)
  
      const data = response.data;
      console.log(data);

      setFilteredReservations(data);
    } catch (error) {
      console.error("Error fetching reservations by date:", error);
    }
  };
  
   

  const handleDateChange = async (newValue) => {
    try {
      console.log("Raw value from DatePicker:", newValue);
  
      // Ensure newValue is a valid date (Day.js object)
      if (!newValue || !dayjs(newValue).isValid()) {
        console.error("Invalid date selected:", newValue);
        return;
      }
  
      // Convert Day.js object to native Date and update state
      const selectedDate = dayjs(newValue).toDate();
      console.log("Parsed and formatted Date:", selectedDate);
  
      setSelectedDate(selectedDate);
      await fetchReservationsByDate(selectedDate);
    } catch (error) {
      console.error("Error handling date change:", error);
    }
  };

  const matchReservationsToSlots = () => {
    const matchedData = courts.map((court) => {
      const timeSlotMatches = timeSlots.map((timeSlot) => {
        const matchedReservation = filteredReservations.find((reservationDate) => {
          const reservation = reservationDate.reservation;
          if (!reservation) return false;
  
          // Determine start and end times based on duration_type if start_time or end_time is null
          let startHour, endHour;
          if (reservationDate.start_time && reservationDate.end_time) {
            startHour = parseInt(reservationDate.start_time.slice(0, 2), 10); // Extract start hour
            endHour = parseInt(reservationDate.end_time.slice(0, 2), 10); // Extract end hour
          } else if (reservationDate.duration_type === "full_day") {
            startHour = 8; // 8 AM
            endHour = 16; // 4 PM
          } else if (reservationDate.duration_type === "half_day") {
            startHour = 12; // 12 PM
            endHour = 16; // 4 PM
          } else {
            // If neither start/end time nor duration_type is provided, skip
            return false;
          }
  
          // Generate 1-hour time slots for this reservation
          const reservationTimeSlots = [];
          for (let hour = startHour; hour < endHour; hour++) {
            const slotStart = hour.toString().padStart(2, "0") + ":00";
            const slotEnd = (hour + 1).toString().padStart(2, "0") + ":00";
            reservationTimeSlots.push(`${slotStart} - ${slotEnd}`);
          }
  
          // Match court, facility, and time slot (case-insensitive)
          return (
            reservation.court.toLowerCase() === court.courtName.toLowerCase() &&
            reservation.facility.toLowerCase() === court.facilityName.toLowerCase() &&
            reservationTimeSlots.includes(timeSlot) // Match time slot
          );
        });
  
        // Log matched slots for debugging
        // if (matchedReservation) {
        //   console.log("Matched Slot:", {
        //     court: court,
        //     timeSlot: timeSlot,
        //     reservation: matchedReservation,
        //   });
        // }
  
        return matchedReservation ? matchedReservation : null;
      });
  
      return { court, timeSlotMatches };
    });
  
    return matchedData;
  };
  
  const matchedReservations = matchReservationsToSlots();  

  useEffect(() => {
      fetchReservationsByDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    fetchCourts();
  }, []);

  return (
    <>
      {/* New DatePicker */}
      <div className="date-picker-today-holder" style={{ marginBottom: "10px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate ? dayjs(selectedDate) : null} // Ensure dayjs object for DatePicker
            onChange={handleDateChange} // Update state on date selection
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <TableContainer
        component={Paper}
        elevation={6}
        className="w-full"
        style={{
          maxHeight: 500,
          overflowY: "auto",
          overflowX: "auto",
          padding: "5px",
        }}
      >
        <div style={{ minWidth: "1000px", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sport</TableCell>
                {timeSlots.map((slot, index) => (
                  <TableCell key={index} align="center" style={{ padding: "6px" }}>
                    {slot}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {matchedReservations.map((matchedCourt, rowIndex) => (
                <TableRow key={rowIndex} style={{ borderTop: "none" }}>
                  {/* Display Facility and Court Name */}
                  <TableCell>{`${matchedCourt.court.facilityName} - ${matchedCourt.court.courtName}`}</TableCell>

                  {/* Render Time Slots */}
                  {matchedCourt.timeSlotMatches.map((reservation, colIndex) => {
                    const status = reservation ? reservation.reservation.status : null;

                    // Define cell style based on booking status
                    const cellStyle = {
                      backgroundColor: reservation
                        ? status === "approved"
                          ? "#0ACF83"
                          : status === "pending"
                          ? "#F6BC0C"
                          : "#D2D3F8"
                        : "white",
                      cursor: reservation ? "pointer" : "default",
                      padding: "4px",
                      minWidth: "70px",
                      height: "40px",
                    };

                    return (
                      <Tooltip
                        key={colIndex}
                        title={reservation ? `Status: ${status}` : "Available"}
                      >
                        <TableCell align="center" style={cellStyle}>
                          {reservation ? "Booked" : ""}
                        </TableCell>
                      </Tooltip>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>

         </Table>
        </div>
      </TableContainer>
    </>
  );
}

export default Schedule;
