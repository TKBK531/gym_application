import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { formStyles } from "../../styles";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const LoginForm = ({ setErrorMessage, setLoading, setLoggedInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const route = "/user/login/";

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await api.post(route, { email, password });

      localStorage.setItem("userData", JSON.stringify(res.data.data));
      localStorage.setItem(ACCESS_TOKEN, res.data.auth_tokens.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.auth_tokens.refresh);

      setLoggedInUser(res.data.data);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage("Invalid credentials. Please try again.");
            break;
          case 404:
            setErrorMessage("User not found.");
            break;
          default:
            setErrorMessage("An error occurred during login.");
        }
      } else if (error.request) {
        setErrorMessage(
          "No response from server. Please check your connection."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className={`${formStyles.formLable}`}>
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default LoginForm;
