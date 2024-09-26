import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Logout() {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }, []);

  return <Navigate to="/login" />;
}

export default Logout;
