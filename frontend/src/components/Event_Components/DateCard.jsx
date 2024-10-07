import React, { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";

const DatePicker = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Get start of the current week
  const startWeek = startOfWeek(currentWeek, { weekStartsOn: 0 });

  // Function to handle week change (Next/Previous)
  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handlePrevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevWeek}
          className="bg-gray-200 p-2 rounded"
        >
          {"<"}
        </button>
        <h2 className="text-xl font-bold">
          {format(startWeek, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextWeek}
          className="bg-gray-200 p-2 rounded"
        >
          {">"}
        </button>
      </div>

      {/* Grid for the week */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-sm font-bold">
            {day}
          </div>
        ))}

        {/* Render each day of the week */}
        {[...Array(7)].map((_, index) => {
          const day = addDays(startWeek, index);
          return (
            <div
              key={index}
              className="border border-gray-200 h-24 relative flex flex-col items-center justify-start p-2"
            >
              <span className="text-sm">{format(day, "d")}</span>
              {/* Placeholder for adding events */}
              <div className="absolute bottom-2 text-xs text-gray-600">
                {/* Example Event (Customize based on logic) */}
                {index === 1 && (
                  <div className="bg-red-800 text-white p-1 rounded">
                    Exam duty 9-12
                  </div>
                )}
                {index === 3 && (
                  <div className="bg-teal-500 text-white p-1 rounded">
                    Kela call 10-11
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
