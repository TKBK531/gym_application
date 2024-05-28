import React from "react";

const PrimaryButton = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      className="bg-primary-red text-white py-3 rounded-md transition-colors duration-300 ease-in-out hover:bg-primary-shade-2 w-full text-sub mb-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
