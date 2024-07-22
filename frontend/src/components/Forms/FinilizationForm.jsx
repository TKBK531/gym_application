import PropTypes from "prop-types";

const FinilizationForm = ({ userData, selectedOption }) => {
  const getUsernameFromEmail = (email) => {
    return email.split("@")[0];
  };
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Registration Number
        </label>
        <input
          type="text"
          value={getUsernameFromEmail(userData.email).toUpperCase()}
          disabled
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

FinilizationForm.propTypes = {
  userData: PropTypes.object,
  selectedOption: PropTypes.string,
};

export default FinilizationForm;
