import React, { useState } from "react";
import { BsPinMapFill } from "react-icons/bs";
import { FaRegCalendarPlus } from "react-icons/fa";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import StatWidge from "../components/Members/StatWidge";
import Schedule from "../components/Schedule/Schedule"; 
import Schedule2 from "../components/Schedule/Schedule2";
import Form from "../components/Schedule/Form";

const statusColors = {
  "Team Practices": "#1EA7FF",
  Confirmed: "#0ACF83",
  Pending: "#F6BC0C",
  Unavailable: "#D2D3F8",
};

const userData = JSON.parse(localStorage.getItem("userData"));

const Reservations = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <div className="p-1">
      <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">
        {/* Hello, {userData.user.first_name} {userData.user.last_name}👋{" "} */}
      </h1>

      {/* boxes */}
      <div className="boxes flex flex-col md:flex-row gap-6 md:gap-32 m-4">
        <StatWidge name="Your reservations" count="4" iconName={faUsers} />
        <StatWidge name="Pending reservations" count="3" iconName={faUsers} />
        <StatWidge name="Confirmed reservations" count="1" iconName={faUsers} />
      </div>

      <div
        className="schedule-body rounded-xl flex flex-col md:flex-row bg-white w-full">

        {/* Left side choice bar */}
        <div
          className="flex flex-row md:flex-col p-3 gap-6 bg-transparent"
          style={{ flex: "0 0 5%", maxWidth: "5%" }}
        >
          <div className="by-court" onClick={() => handleIconClick("map")}>
            <BsPinMapFill
              fontSize={32}
              className={`cursor-pointer transition-colors duration-300 ${
                selectedIcon === "map" ? "text-black font-bold" : "text-gray-600"
              } hover:text-black hover:font-bold`}
            />
          </div>
          <div className="by-date" onClick={() => handleIconClick("calendar")}>
            <FaRegCalendarPlus
              fontSize={32}
              className={`cursor-pointer transition-colors duration-300 ${
                selectedIcon === "calendar" ? "text-black font-bold" : "text-gray-600"
              } hover:text-black hover:font-bold`}
            />
          </div>
        </div>


        {/* Schedule table and date-picker */}
        <div
          className="flex flex-col gap-4 p-1 flex-1"
          style={{
            flex: "1 1 80%", // Flexible, taking 70% of the parent's width
            maxWidth: "80%", // Prevent expansion beyond 70%
            overflowX: "auto", // Handle horizontal overflow
          }}
        >
          {selectedIcon === "map" ? (
            <Schedule2 />
          ) : selectedIcon === "calendar" ? (
            <Schedule />
          ) : null}
        </div>

        {/* Color palette */}
        <div
          className="flex flex-col pr-6"
          style={{
            flex: "0 0 15%", // Fixed at 15% of the parent's width
            maxWidth: "15%", // Prevent expansion beyond 15%
          }}
        >
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="legend-item flex flex-row p-2 gap-2">
              <span className="color-label flex-1 text-xs">{status}</span>
              <div
                className="color-box p-3 rounded-full"
                style={{ backgroundColor: color, width: "1vh", height: "1vh" }}
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
