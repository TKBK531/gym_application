import { useState, useEffect } from "react";
import api from "../api";

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
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex flex-col items-center bg-white shadow-2xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full p-6 flex flex-col items-center">
          <img
            className="w-32 h-32 mt-4 rounded-full border-4 border-white shadow-lg"
            src={profileData.profile_picture}
            alt="Profile"
          />
          <h2 className="text-3xl font-semibold text-white mt-4 drop-shadow-lg">
            {userData.first_name} {userData.last_name}
          </h2>
          <p className="text-md text-blue-100 mt-1">{userData.email}</p>
        </div>

        <div className="px-6 py-8 w-full bg-gray-50">
          <div className="flex items-center text-lg mt-4">
            <svg
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <span>
              <strong>Username:</strong> {userData.username}
            </span>
          </div>
          <div className="flex items-center text-lg mt-4">
            <svg
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <span>
              <strong>City:</strong> {profileData.city}
            </span>
          </div>
          <div className="flex items-center text-lg mt-4">
            <svg
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <span>
              <strong>Contact:</strong> {profileData.contact}
            </span>
          </div>
          <div className="flex items-center text-lg mt-4">
            <svg
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <span>
              <strong>Province:</strong> {profileData.province}
            </span>
          </div>
          <div className="flex items-center text-lg mt-4">
            <svg
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <span>
              <strong>User Type:</strong> {profileData.user_type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
