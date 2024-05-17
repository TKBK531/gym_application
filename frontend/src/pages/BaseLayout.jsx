import React, { useState, useEffect } from "react";
import api from "../api";
import { Outlet } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import NavBar from "../components/NavBar";
import { ACCESS_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";

const BaseLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/`);
      setProfileData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user_id;

        fetchUserDetails(userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="hidden xs:block w-[290px] bg-gray-200">
        {/* {console.log(profileData)} */}

        {/* {console.log(profileData)} */}

        {profileData && <LeftBar profileData={profileData} />}
        {/* {profileData && <LeftBar profileData={profileData} />} */}
        <LeftBar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-gray-200">
          <NavBar />
        </div>
        <div className="flex-1 bg-gray-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
