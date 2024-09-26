import PropTypes from "prop-types";
import Dropdown from "../Dropdowns/Dropdown";
import { useState } from "react";
import FinilizationForm from "../Forms/FinilizationForm";

const FinilizeProfile = ({ closePopup, profileData, userData }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const roles = [
    { value: "student", label: "Student" },
    { value: "academic", label: "Academic Staff" },
    { value: "postgraduate", label: "Postgraduate" },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-xl">
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center">
          <img
            src={profileData.profile_picture}
            alt=""
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
          <h3 className="mt-3 text-xl leading-6 font-semibold text-gray-900">
            {userData.first_name} {userData.last_name}
          </h3>
          <label
            htmlFor="role-dropdown"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            Select your role
          </label>
          <Dropdown options={roles} setSelectedOption={setSelectedOption} />
          {(selectedOption === "student" ||
            selectedOption === "academic" ||
            selectedOption === "postgraduate") && (
            <FinilizationForm
              userData={userData}
              selectedOption={selectedOption}
            />
          )}
        </div>
      </div>
    </div>
  );
};

FinilizeProfile.propTypes = {
  closePopup: PropTypes.func,
  profileData: PropTypes.object,
  userData: PropTypes.object,
};

export default FinilizeProfile;
