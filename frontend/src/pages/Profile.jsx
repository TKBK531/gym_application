import { useState, useEffect } from "react";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  const [profileData, setProfileData] = useState({
    birth_date: "",
    city: "",
    contact: "",
    id: null,
    national_id: "",
    profile_picture: "",
    province: "",
    user_type: "",
  });
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [changedData, setChangedData] = useState({});
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [originalUserData, setOriginalUserData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/user/profile/");
        setProfileData(response.data.data.profile);
        setUserData(response.data.data.user);
        console.log("Profile data:", profileData);
        console.log("User data:", userData);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setOriginalProfileData({ ...profileData });
    setOriginalUserData({ ...userData });
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
    const formData = new FormData();
    Object.keys(changedData).forEach((key) => {
      formData.append(key, changedData[key]);
    });

    console.log("Changed Data:", changedData);
  };
  const handleCancelButtonClick = () => {
    setIsEditing(false);
    setProfileData(originalProfileData);
    setUserData(originalUserData);
    setChangedData({});
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
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>
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
              value={profileData.birth_date}
              onChange={(e) => handleInputChange(e, "birth_date")}
              disabled={!isEditing}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Province and City */}
          <div className="w-full flex flex-row gap-5">
            <div className="w-full">
              {/* Province */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                <input
                  type="label"
                  value={profileData.province}
                  onChange={(e) => handleInputChange(e, "province")}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full">
              {/* City */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="label"
                  value={profileData.city}
                  onChange={(e) => handleInputChange(e, "city")}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/* Edit, Save, Cancel Buttons */}
          <div className="flex flex-row gap-5">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveButtonClick}
                  className="p-2 bg-violet-500 rounded-lg w-[250px]"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelButtonClick}
                  className="p-2 bg-violet-500 rounded-lg w-[250px]"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditButtonClick}
                className="p-2 bg-violet-500 rounded-lg w-[250px]"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
