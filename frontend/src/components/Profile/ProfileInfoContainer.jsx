// ProfileInfoContainer.js
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { profilePageStyles } from "../../styles";
import { cities } from "../../constants/index";
import api from "../../api";
import PropTypes from "prop-types";

const ProfileInfoContainer = ({
  profileData,
  profile_type,
  fetchProfileData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [filteredCityOptions, setFilteredCityOptions] = useState(cities);

  useEffect(() => {
    if (editedData.province) {
      setFilteredCityOptions(
        cities.filter((city) => city.province === editedData.province)
      );
    } else {
      setFilteredCityOptions(cities);
    }
  }, [editedData.province]);

  useEffect(() => {
    setEditedData(profileData);
  }, [profileData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleSaveClick = async () => {
    try {
      const response = await api.put("/user/profile/update/", editedData);
      if (response.data.status === "success") {
        fetchProfileData();
        setIsEditing(false);
      }
    } catch (error) {
      setIsEditing(false);
      console.error("Error saving profile data:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "province") {
      const newFilteredCityOptions = cities.filter(
        (city) => city.province === value
      );
      setFilteredCityOptions(newFilteredCityOptions);

      // Set the city to the first city in the new province
      setEditedData((prevData) => ({
        ...prevData,
        province: value,
        city:
          newFilteredCityOptions.length > 0
            ? newFilteredCityOptions[0].pk
            : null,
      }));
    } else {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: name === "city" ? parseInt(value, 10) : value,
      }));
    }
  };

  return (
    <section className="mb-6">
      <div className="flex justify-left py-5">
        <div className="flex justify-center items-center">
          <img
            src={
              profileData.profile_picture ||
              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="ml-10 gap-2 py-5">
          <h3 className="text-xl font-normal">
            {profileData.first_name} {profileData.last_name}
          </h3>
          <p className="text-gray-400 capitalize">{profile_type} user</p>
        </div>
      </div>

      {/* Buttons and Subtitle */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-medium py-7">Personal Information</h3>
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" // Updated Edit Button Style
          >
            <FontAwesomeIcon icon={faUserEdit} className="mr-1" /> Edit
          </button>
        ) : (
          <div className="flex">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" // Updated Save Button Style
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" // Updated Cancel Button Style
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <p className="text-gray-600">First Name:</p>
          {isEditing && profile_type !== "internal" ? (
            <input
              type="text"
              name="first_name"
              value={editedData.first_name || ""}
              onChange={handleChange}
              className={`${profilePageStyles.dataFieldEditMode}`}
            />
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {profileData.first_name || "John"}
            </p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <p className="text-gray-600">Last Name:</p>
          {isEditing && profile_type !== "internal" ? (
            <input
              type="text"
              name="last_name"
              value={editedData.last_name || ""}
              onChange={handleChange}
              className={`${profilePageStyles.dataFieldEditMode}`}
            />
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {profileData.last_name || "Doe"}
            </p>
          )}
        </div>
        {/* Email */}
        <div>
          <p className="text-gray-600">Email Address:</p>
          {isEditing && profile_type !== "internal" ? (
            <input
              type="email"
              name="email"
              value={editedData.email || ""}
              onChange={handleChange}
              className={`${profilePageStyles.dataFieldEditMode}`}
            />
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {profileData.email || "johndoe@gmail.com"}
            </p>
          )}
        </div>
        {/* Phone */}
        <div>
          <p className="text-gray-600">Phone:</p>
          {isEditing ? (
            <input
              type="text"
              name="contact"
              value={editedData.contact || ""}
              onChange={handleChange}
              className={`${profilePageStyles.dataFieldEditMode}`}
            />
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {profileData.contact || "0715448877"}
            </p>
          )}
        </div>
        {/* National ID */}
        <div>
          <p className="text-gray-600">National ID:</p>
          {isEditing ? (
            <input
              type="text"
              name="national_id"
              value={editedData.national_id || ""}
              onChange={handleChange}
              className={`${profilePageStyles.dataFieldEditMode}`}
            />
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {profileData.national_id || "200015202254"}
            </p>
          )}
        </div>
        <div></div>
      </div>
      {/* Location Info */}
      <div className="flex flex-row w-full">
        {/* Province */}
        <div className="w-1/2">
          <p className="text-gray-600">State / Province:</p>
          {isEditing ? (
            <select
              name="province"
              value={editedData.province}
              onChange={handleChange}
              className={`${profilePageStyles.dataField}`}
            >
              {[...new Set(cities.map((city) => city.province))].map(
                (province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                )
              )}
            </select>
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {cities.find((city) => city.pk === profileData.city)?.province}
            </p>
          )}
        </div>
        {/* City */}
        <div className="w-1/2">
          <p className="text-gray-600">City / District:</p>
          {isEditing ? (
            <select
              name="city"
              value={editedData.city}
              onChange={handleChange}
              className={`${profilePageStyles.dataField}`}
            >
              {filteredCityOptions.map((city) => (
                <option key={city.pk} value={city.pk}>
                  {city.label}
                </option>
              ))}
            </select>
          ) : (
            <p className={`${profilePageStyles.dataField}`}>
              {cities.find((city) => city.pk === editedData.city)?.label ||
                "Not Provided"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

ProfileInfoContainer.propTypes = {
  profileData: PropTypes.object.isRequired,
  profile_type: PropTypes.string.isRequired,
  fetchProfileData: PropTypes.func.isRequired,
};

export default ProfileInfoContainer;
