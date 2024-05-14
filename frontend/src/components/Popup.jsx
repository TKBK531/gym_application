import React from "react";

const Popup = ({ message, type, onClose }) => {
  const typeStyles = {
    success: {
      background: "linear-gradient(to bottom right, #4CAF50, #2E8B57)", // Green gradient
      text: "#FFFFFF",
    },
    error: {
      background: "linear-gradient(to bottom right, #F44336, #C62828)", // Red gradient
      text: "#FFFFFF",
    },
  };

  const currentStyle = typeStyles[type] || {}; // Default to empty object if type is unknown

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="rounded-lg p-8 shadow-md"
        style={{ background: currentStyle.background }}
      >
        <div
          className="text-xl font-bold mb-4"
          style={{ color: currentStyle.text }}
        >
          {type === "success" ? "Success!" : "Error"}
        </div>
        <p className="text-white">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-info-dark-blue hover:bg-transparent border-2 border-info-dark-blue text-white hover:text-black font-normal py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
