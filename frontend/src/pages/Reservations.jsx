import React from "react";
import { BsPinMapFill } from "react-icons/bs";
import { FaRegCalendarPlus } from "react-icons/fa";
import {
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import StatWidge from "../components/Members/StatWidge";
import Schedule from "../components/Schedule/Schedule";
import Date from "../components/Schedule/Date";

const statusColors = {
  "Team Practices": "#1EA7FF",
  "Confirmed": "#0ACF83",
  "Pending": "#F6BC0C",
  "Unavailable": "#D2D3F8",
};


const Reservations = () => (

  <div >
    <h1>Hello Alesia K 👋 </h1>

    <div className="boxes flex flex-row gap-32 m-4">
      <StatWidge name="Your reservations" count="4" iconName={faUsers} /> 
      <StatWidge name="Pending reservations" count="3" iconName={faUsers} /> 
      <StatWidge name="Confirmed reservations" count="1" iconName={faUsers} /> 
    </div>

    <div className="body bg-white rounded-xl flex flex-row">
        {/* left side choice bar */}
        <div className="1">
          <div className='side-choice-bar flex flex-col p-3 gap-y-6 bg-transparent'>
              <div className='by-court'><BsPinMapFill fontSize={36} class='cursor-pointer'/></div>
              <div className='by-date'><FaRegCalendarPlus fontSize={36} class='cursor-pointer'/></div>
          </div>
        </div>
        {/* Schedule table and date-picker*/}
        <div className="2 flex flex-col gap-4 p-1">
          <div className='date-picker-today-holder pb-3 flex flex-row' style={{ height: "7%" }}>
            <div className='today-holder'><Date/></div>
          </div>
          <Schedule/>
        </div>
        {/* color palette */}
        <div className="3">
          <div className='color-palette-holder pr-6 flex flex-col '>
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
);

export default Reservations;
