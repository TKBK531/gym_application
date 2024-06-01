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
    <>
      {/* <GoogleButton
        className="w-full"
        onClick={onGoogleLoginSuccess}
        label="Sign in Using your University Google Account"
      /> */}
      <button
        type="button"
        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md w-full flex items-center justify-center text-sub"
        onClick={onGoogleLoginSuccess}
      >
        <img
          src="https://e7.pngegg.com/pngimages/299/774/png-clipart-google-logo-google-search-search-engine-optimization-google-s-google-google-logo-google-thumbnail.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        University Email
      </button>
    </>
  );
};

export default GoogleLoginButton;
