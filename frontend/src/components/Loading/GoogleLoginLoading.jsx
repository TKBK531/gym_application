import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

function GoogleLoginLoading() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");
    const refreshToken = queryParams.get("refresh_token");

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/user/profile/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const responseData = await response.json();
          const userData = responseData.data.user;
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/dashboard");
        } else {
          console.error("Failed to fetch user data: ", response.statusText);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    if (accessToken) {
      fetchUserData();
    } else {
      console.error("No access token found");
      navigate("/login");
    }
  }, [location.search, BASE_API_URL, navigate]);

  return (
    <div className="loading-screen flex flex-col items-center justify-center min-h-screen">
      <div className="loader-spinner animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
      <div className="loading-text mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Loading...
      </div>
    </div>
  );
}

export default GoogleLoginLoading;
