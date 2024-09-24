import React, { useState } from "react";
import { BsPinMapFill } from "react-icons/bs";
import { FaRegCalendarPlus } from "react-icons/fa";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import StatWidge from "../components/Members/StatWidge";
import Schedule from "../components/Schedule/Schedule";
import Date from "../components/Schedule/Date";
import Form from "../components/Schedule/Form"; 

const statusColors = {
  "Team Practices": "#1EA7FF",
  "Confirmed": "#0ACF83",
  "Pending": "#F6BC0C",
  "Unavailable": "#D2D3F8",
};

const Reservations = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  
  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl mb-4">Hello Alesia K 👋</h1>

      <div className="boxes flex flex-col md:flex-row gap-6 md:gap-32 m-4">
        <StatWidge name="Your reservations" count="4" iconName={faUsers} />
        <StatWidge name="Pending reservations" count="3" iconName={faUsers} />
        <StatWidge name="Confirmed reservations" count="1" iconName={faUsers} />
      </div>

      <div className="schedule-body bg-white rounded-xl flex flex-col md:flex-row">
        {/* left side choice bar */}
        <div className="flex flex-row md:flex-col p-3 gap-6 bg-transparent">
          <div className="by-court">
            <BsPinMapFill fontSize={36} className="cursor-pointer" />
          </div>
          <div className="by-date">
            <FaRegCalendarPlus fontSize={36} className="cursor-pointer" />
          </div>
        </div>

        {/* Schedule table and date-picker */}
        <div className="flex flex-col gap-4 p-1 flex-1">
          <div className="date-picker-today-holder pb-3" style={{ height: "7%" }}>
            <Date />
          </div>
          <Schedule />
        </div>

        {/* color palette */}
        <div className="flex flex-col pr-6">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="legend-item flex flex-row p-2 gap-2">
              <span className="color-label flex-1">{status}</span>
              <div
                className="color-box p-3 rounded-full"
                style={{ backgroundColor: color, width: "2vh", height: "2vh" }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Button to open the Form */}
      <div className="reservation-form-holder mt-8 flex justify-center">
        <button
          onClick={handleOpenForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add reservation
        </button>

        <Form isOpen={isFormOpen} onClose={handleCloseForm} />
      </div>
    </div>
  );
};

export default Reservations;
