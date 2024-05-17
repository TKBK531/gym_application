import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

const ProfileDataContext = createContext(null);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await api.get(`/user/${userId}/`);
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error here (e.g., set an error state)
      }
    };

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        fetchUserDetails(userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <ProfileDataContext.Provider value={profileData}>
      {children}
    </ProfileDataContext.Provider>
  );
};

export const useProfileData = () => {
  const context = React.useContext(ProfileDataContext);
  if (context === undefined) {
    throw new Error("useProfileData must be used within a ProfileDataProvider");
  }
  return context;
};
