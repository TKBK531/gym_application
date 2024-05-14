import React from "react";

const Popup = ({ message, type, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <div
          className={`text-xl font-bold mb-4 ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "success" ? "Success!" : "Error"}
        </div>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-info-dark-blue hover:bg-transparent text-white hover:text-black font-normal py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Popup;
