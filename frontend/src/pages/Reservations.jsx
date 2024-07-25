import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";
import { BsPinMapFill } from "react-icons/bs";
import { FaRegCalendarPlus } from "react-icons/fa";
import {
  faSwimmer,
  faWalking,
  faUsers,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import StatWidge from "../components/Members/StatWidge";

const bookings = [
  { sport: "Badminton", time: "8 AM - 11 AM", bookedBy: "Akira Yamamoto", status: "Team Practices" },
  { sport: "Baseball", time: "9 AM - 11 AM", bookedBy: "Sakura Tanaka", status: "Confirmed" },
  { sport: "Tennis", time: "11 AM - 12 PM", bookedBy: "Aisha Khan", status: "Confirmed" },
  { sport: "Tennis", time: "12 PM - 1 PM", bookedBy: "Aisha Khan", status: "Team Practices" },
  { sport: "Rugby", time: "3 PM - 7 PM", bookedBy: "Linh Nguyen", status: "Unavailable" },
  { sport: "Soccer", time: "10 AM - 12 PM", bookedBy: "Mei Chen", status: "Pending" },
  { sport: "Cricket", time: "3 PM - 4 PM", bookedBy: "Haruto Sato", status: "Unavailable" },
  { sport: "Volleyball", time: "8 AM - 10 AM", bookedBy: "Linh Nguyen", status: "Team Practices" },
  { sport: "Swimming", time: "10 AM - 11 AM", bookedBy: "Akira Yamamoto", status: "Confirmed" },
  { sport: "Swimming", time: "4 PM - 5 PM", bookedBy: "Sakura Tanaka", status: "Team Practices" },
  { sport: "Table Tennis", time: "9 AM - 10 AM", bookedBy: "Mei Chen", status: "Pending" },
  { sport: "Table Tennis", time: "3 PM - 4 PM", bookedBy: "Ravi Singh", status: "Unavailable" },
];


const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 19; hour++) {
    const period = hour < 12 ? "AM" : "PM";
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    const nextHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
    const nextPeriod = hour + 1 < 12 ? "AM" : hour + 1 === 12 ? "PM" : period;
    slots.push(`${adjustedHour} ${period} - ${nextHour} ${nextPeriod}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();


const getBookingInfo = (sport, timeSlot) => {
  return bookings.find((b) => {
    const [start, end] = b.time.split(" - ");
    const [startHour, startPeriod] = start.split(" ");
    const [endHour, endPeriod] = end.split(" ");
    const [slotStart, slotEnd] = timeSlot.split(" - ");
    const [slotStartHour, slotStartPeriod] = slotStart.split(" ");
    const [slotEndHour, slotEndPeriod] = slotEnd.split(" ");


    const bookingStart = parseTime(startHour, startPeriod);
    const bookingEnd = parseTime(endHour, endPeriod);
    const slotStartTime = parseTime(slotStartHour, slotStartPeriod);
    const slotEndTime = parseTime(slotEndHour, slotEndPeriod);

  
    return b.sport === sport && bookingStart <= slotStartTime && bookingEnd >= slotEndTime;
  });
};


const parseTime = (hour, period) => {
  const parsedHour = parseInt(hour, 10);
  return period === "PM" && parsedHour !== 12
    ? parsedHour + 12
    : period === "AM" && parsedHour === 12
    ? 0
    : parsedHour;
};


const statusColors = {
  "Team Practices": "#1EA7FF",
  "Confirmed": "#0ACF83",
  "Pending": "#F6BC0C",
  "Unavailable": "#D2D3F8",
};


const assignStatusColors = (status) => {
  return statusColors[status] || "white";
};

const sports = [
  "Badminton",
  "Basketball",
  "Tennis",
  "Soccer",
  "Volleyball",
  "Swimming",
  "Baseball",
  "Hockey",
  "Rugby",
  "Cricket",
  "Golf",
  "Table Tennis",
];

const Reservations = () => (

  

  <div >
    <h1 className="font-poppins font-semibold xs:text-[64px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full">
      Reservations
    </h1>
    <div className="boxes">
      <StatWidge name="Overall membership" count="1250" iconName={faUsers} /> 
    </div>
    <div className="body bg-white rounded-lg">
      <div className="table_and_table_legend flex flex-row">
        <div className="1">
          <div className='side-choice-bar flex flex-col p-3 gap-y-6 bg-transparent'>
              <div className='by-court'><BsPinMapFill fontSize={36} class='cursor-pointer'/></div>
              <div className='by-date'><FaRegCalendarPlus fontSize={36} class='cursor-pointer'/></div>
          </div>
        </div>
        <div className="2 p-5">
          <TableContainer component={Paper} 
          style={{
          maxHeight: 500, 
          overflowY: 'auto', 
          overflowX: 'auto', 
        }}>
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
                {sports.map((sport, rowIndex) => (
                  <TableRow key={rowIndex} style={{ borderTop: "none" }}>
                    <TableCell style={{ padding: "6px" }}>{sport}</TableCell>
                    {timeSlots.map((timeSlot, colIndex) => {
                      const booking = getBookingInfo(sport, timeSlot);
                      const bookedBy = booking ? booking.bookedBy : null;
                      const status = booking ? booking.status : null;

                      
                      const previousBooking = colIndex > 0 ? getBookingInfo(sport, timeSlots[colIndex - 1]) : null;
                      const nextBooking = colIndex < timeSlots.length - 1 ? getBookingInfo(sport, timeSlots[colIndex + 1]) : null;

                      const isStart =
                        !previousBooking || 
                        previousBooking.bookedBy !== bookedBy || 
                        previousBooking.status !== status; 
                        
                      const isEnd =
                        !nextBooking ||
                        nextBooking.bookedBy !== bookedBy ||
                        nextBooking.status !== status;

                      const cellStyle = {
                        backgroundColor: booking
                          ? assignStatusColors(booking.status)
                          : "white",
                        cursor: booking ? "pointer" : "default",
                        padding: "4px",
                        borderTop: "none",
                        borderBottom: "none",
                        minWidth: "70px",
                        borderRadius: booking
                          ? isStart && isEnd
                            ? "100px"
                            : isStart
                            ? "100px 0 0 100px" 
                            : isEnd
                            ? "0 100px 100px 0" 
                            : "0" 
                          : "0",
                        borderLeft: "1px solid #e0e0e0",
                        borderRight: "1px solid #e0e0e0",
                        lineHeight: "1.2",
                        height: "40px",
                      };

                      return (
                        <Tooltip
                          key={colIndex}
                          title={bookedBy ? `Status: ${status}` : "Available"}
                        >
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
        </div>
        <div className="3">
          <div className='color-palette-holder  flex flex-col bg-white '>
          {Object.entries(statusColors).map(([status, color]) => (
                  <div key={status} className="legend-item  flex flex-row p-2 gap-2">
                    <span className="color-label flex-1">{status}</span>
                    <div className="color-box p-3 rounded-full" style={{ backgroundColor: color, width:'2vh', height:'2vh' }}></div>
                  </div>
                ))} 
            </div>
        </div>
    </div>
    </div>
    
    


  </div>
);

export default Reservations;
