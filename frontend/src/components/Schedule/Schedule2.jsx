import React, { useState, useEffect, useCallback } from "react";
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import api from "../../api";

function Schedule2() {
  const [courts, setCourts] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs());
  const [weekDates, setWeekDates] = useState([]);
  const [reservations,setReservations] = useState([]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      const startHour = hour.toString().padStart(2, "0");
      const endHour = (hour + 1).toString().padStart(2, "0");
      slots.push(`${startHour}:00 - ${endHour}:00`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  const generateWeekDates = useCallback(() => {
    const startDate = dayjs(selectedWeekStart);
    const dates = [];
    for (let i = -6; i <= 6; i++) {
      dates.push(startDate.add(i, "day").format("YYYY-MM-DD"));
    }
    setWeekDates(dates);
  }, [selectedWeekStart]);

  const fetchFacilitiesAndCourts = async () => {
    try {
      const [facilitiesResponse, courtsResponse] = await Promise.all([
        api.get("/reservation/requestAllFacilities/"),
        api.get("/reservation/requestAllCourts/"),
      ]);

      setFacilities(facilitiesResponse.data);
      setCourts(courtsResponse.data);
    } catch (error) {
      console.error("Failed to fetch facilities or courts:", error);
    }
  };

  useEffect(() => {
    fetchFacilitiesAndCourts();
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      const filtered = courts.filter(
        (court) => court.facility === selectedFacility.facility_id
      );
      setFilteredCourts(filtered);
      setSelectedCourt(null); 
    }
  }, [selectedFacility, courts]);

  useEffect(() => {
    generateWeekDates();
  }, [generateWeekDates]);

  const handleFacilityChange = (event) => {
    const selectedFacilityId = parseInt(event.target.value, 10);
    const facility = facilities.find((fac) => fac.facility_id === selectedFacilityId);
    setSelectedFacility(facility);
  };

  const handleCourtChange = (event) => {
    setSelectedCourt(event.target.value);
  };

  const fetchReservations =async (facility, court, startDate, endDate) => {
    try {
      const apiUrl = `/reservation/requestReservationDatesByCourt/${facility}/${court}/${startDate}/${endDate}/`;
      const response = await api.get(apiUrl);
      setReservations(response.data);
      console.log(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    }
  };

  useEffect(() => {
    const startDate = dayjs(selectedWeekStart).subtract(6, "day").format("YYYY-MM-DD");
    const endDate = dayjs(selectedWeekStart).add(6, "day").format("YYYY-MM-DD");
  
    if (selectedFacility && selectedCourt) {
      fetchReservations(
        selectedFacility.facility_name,
        selectedCourt,
        startDate,
        endDate
      );
    }
  }, [selectedFacility, selectedCourt, selectedWeekStart]);

  const getBookingInfo = (date, timeSlot) => {
    return reservations.find((reservation) => {
      let reservationStartHour, reservationEndHour;
  
      // Handle cases where start_time and end_time are null
      if (reservation.start_time && reservation.end_time) {
        reservationStartHour = parseInt(reservation.start_time.slice(0, 2), 10);
        reservationEndHour = parseInt(reservation.end_time.slice(0, 2), 10);
      } else if (reservation.duration_type === "full_day") {
        reservationStartHour = 8; 
        reservationEndHour = 16; 
      } else if (reservation.duration_type === "half_day") {
        reservationStartHour = 12; 
        reservationEndHour = 16; 
      } else {
        return false;
      }

      const timeSlotStartHour = parseInt(timeSlot.split(" - ")[0].slice(0, 2), 10);

      return (
        reservation.date === date &&
        timeSlotStartHour >= reservationStartHour &&
        timeSlotStartHour < reservationEndHour
      );
    });
  };  

  const statusColors = {
    "Team Practices": "#1EA7FF",
    approved: "#0ACF83",
    pending: "#F6BC0C",
    Unavailable: "#D2D3F8",
  };
  const assignStatusColors = (status) => statusColors[status] || "white";

  return (
    <>
      <div className="court-week-picker-today-holder pb-3 flex flex-row w-full" style={{ height: "8%" }}>
        {/* Facility Dropdown */}
        <select value={selectedFacility?.facility_id || ""} onChange={handleFacilityChange}>
          <option value="">Select Facility</option>
          {facilities.map((facility) => (
            <option key={facility.facility_id} value={facility.facility_id}>
              {facility.facility_name}
            </option>
          ))}
        </select>

        {/* Court Dropdown */}
        <select value={selectedCourt || ""} onChange={handleCourtChange}>
          <option value="">Select Court</option>
          {filteredCourts.map((court) => (
            <option key={court.court_id} value={court.court_name}>
              {court.court_name}
            </option>
          ))}
        </select>

        {/* DatePicker */}
        <div className="date-picker-today-holder"  style={{margin: "4px"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={dayjs(selectedWeekStart)}
              onChange={(newValue) => setSelectedWeekStart(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>

      <TableContainer component={Paper} elevation={6} style={{ maxHeight: 500, overflowY: "auto", overflowX: "auto", padding: "5px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {timeSlots.map((slot, index) => (
                <TableCell key={index} align="center" style={{ padding: "6px" }}>
                  {slot}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weekDates.map((date, rowIndex) => (
              <TableRow key={rowIndex} style={{ borderTop: "none" }}>
                <TableCell style={{ padding: "6px", minWidth: "90px" }}>{date}</TableCell>
                {timeSlots.map((timeSlot, colIndex) => {
                  const booking = getBookingInfo(date, timeSlot);
                  const cellStyle = {
                    backgroundColor: booking ? assignStatusColors(booking.reservation.status) : "white",
                    cursor: booking ? "pointer" : "default",
                    padding: "4px",
                    borderTop: "none",
                    borderBottom: "none",
                    minWidth: "70px",
                    // borderRadius: booking
                    //   ? isStart && isEnd
                    //     ? "100px"
                    //     : isStart
                    //     ? "100px 0 0 100px"
                    //     : isEnd
                    //     ? "0 100px 100px 0"
                    //     : "0"
                    //   : "0",
                    borderLeft: "1px solid #e0e0e0",
                    borderRight: "1px solid #e0e0e0",
                    lineHeight: "1.2",
                    height: "40px",
                  };
                  return (
                    <Tooltip key={colIndex} title={booking ? `Status: ${booking.status}` : "Available"}>
                      <TableCell align="center" style={cellStyle}>
                        {booking ? "Booked" : ""}
                      </TableCell>
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Schedule2;
