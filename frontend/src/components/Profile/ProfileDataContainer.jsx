import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const ProfileDataContainer = ({
  userData,
  profileData,
  userTypeData,
  setUserData,
  setProfileData,
}) => {
  const [changedData, setChangedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(
    profileData.province
  );
  const [filteredCities, setFilteredCities] = useState([]);
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [originalUserData, setOriginalUserData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const filterCities = cities.filter(
      (city) => city.province === selectedProvince
    );
    setFilteredCities(filterCities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  const resetDataChanged = () => {
    setIsEditing(false);
    setProfileData(originalProfileData);
    setUserData(originalUserData);
    setChangedData({});
  };

  const handleEditButtonClick = async () => {
    setIsEditing(true);
    setOriginalProfileData({ ...profileData });
    setOriginalUserData({ ...userData });

    if (cities.length === 0 || provinces.length === 0) {
      await fetchCitiesAndProvinces();
    }

    console.log("Cities:", cities);
    console.log("Provinces:", provinces);
  };

  const handleDeleteButtonClick = async () => {
    setShowConfirmation(true); // Show the confirmation popup
  };

  const handleConfirmDelete = async () => {
    setShowConfirmation(false); // Hide the confirmation popup
    try {
      const response = await api.delete("/user/profile/delete/");
      if (response.status === 200) {
        window.location.href = "/logout";
      }
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  const handleSaveButtonClick = async () => {
    setIsEditing(false);
    const formData = new FormData();
    Object.keys(changedData).forEach((key) => {
      formData.append(key, changedData[key]);
    });
    console.log("Changed Data:", changedData);

    if (Object.keys(changedData).length === 0) {
      console.log("No changes made");
    } else {
      try {
        const response = await api.put("/user/profile/update/", formData);
        console.log("Profile updated:", response.data);
        resetDataChanged();
        // window.location.reload();
      } catch (error) {
        resetDataChanged();
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleCancelButtonClick = () => {
    resetDataChanged();
  };

  const fetchCitiesAndProvinces = async () => {
    const cityResp = await api.get("/user/cities/");
    setCities(cityResp.data.data);

    const provinceResp = await api.get("/user/provinces/");
    setProvinces(provinceResp.data.data);
  };

  const handleInputChange = (event, dataKey) => {
    const { value } = event.target;
    if (dataKey in userData) {
      setUserData((prev) => ({ ...prev, [dataKey]: value }));
    } else if (dataKey in profileData) {
      setProfileData((prev) => ({ ...prev, [dataKey]: value }));
    }
    setChangedData((prev) => ({ ...prev, [dataKey]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setChangedData({ ...changedData, profile_picture: file });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-normal mb-6 mt-3 text-center">
        {userData.first_name} {userData.last_name}
      </h2>
      <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-6 relative">
        <div className="mt-4 flex flex-col text-center items-center">
          <div
            className="relative cursor-pointer"
            onClick={() =>
              isEditing && document.getElementById("profile_picture").click()
            }
          >
            <img
              src={imagePreview || profileData.profile_picture}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
            {isEditing && (
              <div className="absolute top-0 left-0 rounded-full right-0 bottom-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-white w-6 h-6"
                />
              </div>
            )}
          </div>
          <p className="my-3">{profileData.user_type.toUpperCase()} USER</p>
        </div>
        {isEditing && (
          <input
            id="profile_picture"
            name="profile_picture"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start my-10">
        <div className="w-full">
          {/* First Name and Last Name */}
          <div className="w-full flex flex-row gap-5">
            <div className="w-full">
              {/* First Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={userData.first_name}
                  onChange={(e) => handleInputChange(e, "first_name")}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full">
              {/* Last name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={userData.last_name}
                  onChange={(e) => handleInputChange(e, "last_name")}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={userData.email}
              onChange={(e) => handleInputChange(e, "email")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* National ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              National ID
            </label>
            <input
              type="email"
              value={profileData.national_id}
              onChange={(e) => handleInputChange(e, "national_id")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Birth Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <input
              type="date"
              value={profileData.date_of_birth}
              onChange={(e) => handleInputChange(e, "date_of_birth")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Province and City Labels*/}
          <div className="w-full flex flex-row gap-5">
            <div className="w-full">
              {/* Province */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                {!isEditing ? (
                  <input
                    type="text"
                    value={profileData.province}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                  />
                ) : (
                  <select
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(parseInt(e.target.value));
                      handleInputChange(e, "province");
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="w-full">
              {/* City */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>

                {!isEditing ? (
                  <input
                    type="label"
                    value={profileData.city}
                    onChange={(e) => handleInputChange(e, "city")}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <select
                    value={profileData.city}
                    onChange={(e) => handleInputChange(e, "city")}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {filteredCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* User Type Data */}
          {profileData.user_type === "student" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={userTypeData.registration_number}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Faculty
                </label>
                <input
                  type="text"
                  value={userTypeData.faculty}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}
          {profileData.user_type === "academic" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  UPF Number
                </label>
                <input
                  type="text"
                  value={userTypeData.upf_number}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Faculty
                </label>
                <input
                  type="text"
                  value={userTypeData.faculty}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Appoinment
                </label>
                <input
                  type="text"
                  value={userTypeData.date_of_appointment}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}
          {profileData.user_type === "postgraduate" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Postgraduate Registration Number
                </label>
                <input
                  type="text"
                  value={userTypeData.pg_registration_number}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Postgraduate Commencement Date
                </label>
                <input
                  type="text"
                  value={userTypeData.pg_commencement_date}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Appoinment
                </label>
                <input
                  type="text"
                  value={userTypeData.date_of_appointment}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}

          {/* Edit, Save, Cancel Buttons */}
          <div className="flex flex-row gap-5">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveButtonClick}
                  className="p-2 bg-secondary-golden-shade-1 hover:bg-secondary-golden rounded-lg w-[250px] transition ease-in-out duration-300"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelButtonClick}
                  className="p-2 bg-primary-red hover:bg-primary-shade-2 text-white rounded-lg w-[250px] transition ease-in-out duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={handleEditButtonClick}
                  className="p-2 bg-secondary-golden-shade-1 hover:bg-secondary-golden rounded-lg w-[250px] transition ease-in-out duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteButtonClick}
                  className="p-2 bg-primary-red hover:bg-primary-shade-2 text-white rounded-lg w-[250px] transition ease-in-out duration-300"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationPopup
          className="animate-popup"
          message="Are you sure you want to delete your account?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
};

ProfileDataContainer.propTypes = {
  userData: PropTypes.object.isRequired,
  profileData: PropTypes.object.isRequired,
  setUserData: PropTypes.func,
  setProfileData: PropTypes.func,
  userTypeData: PropTypes.object,
};

export default ProfileDataContainer;
