import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({
  profileData: null,
  isLoading: true,
  error: null,
});

export const UserDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsLoading(false); // No token, don't fetch
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const response = await api.get(`/user/${decodedToken.user_id}/`);
        setProfileData(response.data.data);
        localStorage.setItem("profileData", JSON.stringify(response.data.data)); // Store in localStorage
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData)); // Use stored data
      setIsLoading(false);
    } else {
      fetchUserDetails(); // Fetch only if not stored
    }
  }, []);

  return (
    <UserContext.Provider value={{ profileData, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
