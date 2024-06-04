import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../api";

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    setProfileData(userData);
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      console.log("Fetching profile data...");
      const response = await api.get("/user/profile/");
      if (response.data.status === "success") {
        setProfileData(response.data.data.user);
        console.log(profileData);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (section) => {
    console.log(`Edit ${section} clicked`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Profile{" "}
        <span className="text-sm text-gray-400">
          {profileData.user_type} user
        </span>
      </h2>

      <div className="flex justify-center mb-6">
        <img
          src={
            profileData.profile_picture ||
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      </div>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">Personal Information</h3>
          <button
            onClick={() => handleEditClick("Personal Information")}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faUserEdit} className="mr-1" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">First Name:</p>
            <p className="font-medium">{profileData.first_name || "John"}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Name:</p>
            <p className="font-medium">{profileData.last_name || "Doe"}</p>
          </div>
          <div>
            <p className="text-gray-600">Email Address:</p>
            <p className="font-medium">
              {profileData.email || "johndoe@gmail.com"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Phone:</p>
            <p className="font-medium">{profileData.contact || "0715448877"}</p>
          </div>
          <div>
            <p className="text-gray-600">National ID:</p>
            <p className="font-medium">
              {profileData.national_id || "200015202254"}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">Location Information</h3>
          <button
            onClick={() => handleEditClick("Location Information")}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">State / Province:</p>
            <p className="font-medium">
              {profileData.province || "Sabaragamuwa"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">City / District:</p>
            <p className="font-medium">{profileData.city || "Kegalle"}</p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Profile;
