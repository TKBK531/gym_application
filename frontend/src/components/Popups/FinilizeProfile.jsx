import PropTypes from "prop-types";
import Dropdown from "../Dropdowns/Dropdown";

const FinilizeProfile = ({ closePopup, profileData, userData }) => {
  const roles = [
    { value: "student", label: "Student" },
    { value: "staff", label: "Staff" },
    { value: "postgraduate", label: "Postgraduate" },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white z-30">
        <button onClick={closePopup} className="absolute top-0 right-0 p-2">
          X
        </button>
        <div className="mt-3 text-center items-center flex flex-col">
          <img
            src={profileData.profile_picture}
            alt=""
            className="w-32 h-32 object-cover rounded-full"
          />

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {userData.first_name} {userData.last_name}
          </h3>
          <label
            htmlFor="role-dropdown"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select your role
          </label>
          <Dropdown options={roles} />
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
