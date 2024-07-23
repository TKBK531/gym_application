import PropTypes from "prop-types";
import { useState } from "react";
import { faculties } from "../../constants/index";
import Dropdown from "../Dropdowns/Dropdown";

const FinilizationForm = ({ userData, selectedOption }) => {
  const [faculty, setFaculty] = useState("");
  const getUsernameFromEmail = (email) => {
    const username = email.split("@")[0];
    return username;
  };

  const getFacultyFromEmail = (email) => {
    const facultyCode = email.split("@")[1].split(".")[0];
    const faculty = faculties.find((faculty) => faculty.code === facultyCode);
    return faculty;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      {selectedOption === "student" && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            value={getUsernameFromEmail(userData.email).toUpperCase()}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />

          <label className="block text-sm font-medium text-gray-700">
            Faculty
          </label>
          <input
            type="text"
            value={getFacultyFromEmail(userData.email)?.label || ""}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
      )}
      {selectedOption === "academic" && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            UPF Number
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label className="block text-sm font-medium text-gray-700">
            Faculty
          </label>
          <Dropdown options={faculties} setSelectedOption={setFaculty} />
          <label className="block text-sm font-medium text-gray-700">
            Date of Appoinment
          </label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
      {selectedOption === "postgraduate" && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            PG Registration Number
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label className="block text-sm font-medium text-gray-700">
            PG commencement Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out mt-5 w-full"
      >
        Finish
      </button>
    </div>
  );
};

FinilizationForm.propTypes = {
  userData: PropTypes.object.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default FinilizationForm;
