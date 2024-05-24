import React from "react";
import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { formStyles } from "../styles";
import Popup from "../components/Popup";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");

  const navigate = useNavigate();

  const route = "/user/login/";

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      localStorage.setItem("loginResponse", JSON.stringify(res.data));
      localStorage.setItem(ACCESS_TOKEN, res.data.auth_tokens.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.auth_tokens.refresh);

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex">
      <div className="w-full p-20">
        <div className="container mx-auto max-w-lg p-8 bg-white rounded-lg shadow-md">
          <div className="container">
            <h1 className="w-full flex flex-col uppercase items-center text-heading3 font-medium mb-3">
              Welcome Back
            </h1>
            <p className="flex flex-col items-center text-sub mb-6">
              Please enter your details.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className={`${formStyles.formLable}`}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${formStyles.formTextInput}`}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className={`${formStyles.formLable}`}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className={`${formStyles.formTextInput}`}
                  required
                />
              </div>

              <div className="mb-4 flex h-auto items-baseline">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="mr-2 rounded"
                />
                <label htmlFor="remember" className={`${formStyles.formLable}`}>
                  Remember me
                </label>

                <a
                  href="#"
                  className={`${formStyles.formLable} hover:underline ml-auto text-primary-shade-1`}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="bg-primary-red text-white py-3 rounded-md transition-colors duration-300 ease-in-out hover:bg-primary-shade-2 w-full text-sub mb-3"
              >
                Login
              </button>

              <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md w-full flex items-center justify-center text-sub">
                <img
                  src="https://e7.pngegg.com/pngimages/299/774/png-clipart-google-logo-google-search-search-engine-optimization-google-s-google-google-logo-google-thumbnail.png"
                  alt="Google logo"
                  className="w-5 h-5 mr-2"
                />
                <span>Sign in with Google</span>
              </button>

              <div className="text-center mt-4"></div>
            </form>
          </div>

          <div className="container text-left mt-6">
            <p className={`${formStyles.formLable}`}>
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className={`ml-3 text-primary-shade-1 hover:underline`}
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
