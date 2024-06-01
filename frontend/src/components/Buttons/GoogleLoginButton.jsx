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
    window.location.href = `${GOOGLE_AUTH_URL}?${urlParams}`;
  };

  return (
    <GoogleButton onClick={onGoogleLoginSuccess} label="Sign in with Google" />
  );
};

export default GoogleLoginButton;
