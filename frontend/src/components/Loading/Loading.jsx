import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Loading() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");

    // Simulate API call to fetch user data with the token
    const fetchUserData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${BASE_API_URL}/user/profile/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log(userData);
          console.log(localStorage.getItem("userData"));
          setLoggedInUser(userData);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    if (accessToken) {
      fetchUserData();
    } else {
      navigate("/login"); // If no token, redirect to login
    }
  });

  return (
    <div className="loading-screen flex flex-col items-center justify-center min-h-screen">
      <div className="loader-spinner animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
      <div className="loading-text mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Loading...
      </div>
    </div>
  );
}

export default Loading;
