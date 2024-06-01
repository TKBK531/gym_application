import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(null);

  const onGoogleLoginSuccess = async () => {
    const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const REDIRECT_URI = "auth/api/login/google/";
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const BASE_API_URL = import.meta.env.VITE_API_URL;

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${BASE_API_URL}/${REDIRECT_URI}`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();
    try {
      window.location.href = `${GOOGLE_AUTH_URL}?${urlParams}`;
      const response = await fetch(`${GOOGLE_AUTH_URL}?${urlParams}`);

      if (response.ok) {
        const data = await response.json();

        // Securely store tokens in localStorage
        localStorage.setItem("accessToken", data.auth_tokens.access);
        localStorage.setItem("refreshToken", data.auth_tokens.refresh);
        console.log(data);
        // Fetch user data and store in localStorage
        const userDataResponse = await fetch(`${BASE_API_URL}/user/profile/`, {
          // Replace with your user data endpoint
          headers: {
            Authorization: `Bearer ${data.auth_tokens.access}`,
          },
        });

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          console.log(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/dashboard");
        }

        // Redirect to dashboard
        window.location.href = data.redirect_url;
      } else {
        // Handle error response from Google OAuth or your backend
        console.error("Error logging in with Google:", response.statusText);
        // Consider showing an error message to the user
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      // Consider showing an error message to the user
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authTokensParam = urlParams.get("auth_tokens");
    if (authTokensParam) {
      const tokens = JSON.parse(authTokensParam);
      setAuthTokens(tokens);

      window.history.replaceState({}, document.title, window.location.pathname);
      console.log(authTokens);
    }
  }, [authTokens]);

  return (
    <GoogleButton onClick={onGoogleLoginSuccess} label="Sign in with Google" />
  );
};

export default GoogleLoginButton;
