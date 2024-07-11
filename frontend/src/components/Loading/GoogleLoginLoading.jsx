import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import api from "../../api";

function GoogleLoginLoading() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");
    const refreshToken = queryParams.get("refresh_token");

    if (!accessToken) {
      console.error("No access token found");
      navigate("/login");
      return;
    }

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    api
      .get("/user/profile/")
      .then((response) => {
        const userData = response.data.data;
        console.log("User data:", userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/login");
      });
  }, [location.search, navigate]);

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
