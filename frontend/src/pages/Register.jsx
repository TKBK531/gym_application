import React, { useState } from "react";
import { formStyles } from "../styles";
import { Navigate } from "react-router-dom";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // Add state for errors
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Form Validation (Example)
    const validationErrors = {};
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    // Add other validation rules (e.g., email format, password strength, etc.)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //Prepare Data for API
    const requestData = {
      user: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
      contact: formData.contact,
    };

    //API Submission
    try {
      const response = await fetch(`${BASE_URL}/user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Handle API Errors
        const errorData = await response.json();
        // Set errors from the API response or display a generic error message
        setErrors({ apiError: errorData.detail || "Registration failed" });
        alert(errorData);
      } else {
        //Handle Successful Registration
        // Clear form data, redirect to login, etc.
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          contact: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({}); // Clear errors
        alert("Successfully Registered");
        <Navigate to="/login" />;
      }
    } catch (error) {
      // Handle Network Errors
      console.error("Network error:", error);
      setErrors({ apiError: "Network error. Please try again." });
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-3/4 max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className={`${formStyles.formTitle}`}>Create an Account</h2>
        <p className="text-sm text-gray-500 text-center mb-2">
          Already have an account?{" "}
          <a href="/login" className="text-primary-shade-1 hover:underline">
            Log in
          </a>
        </p>
        <form onSubmit={handleRegister} className="mt-10 space-y-4">
          <div className="flex space-x-4">
            {/* First and Last Name */}
            <div className="w-1/2">
              <label htmlFor="firstName" className={`${formStyles.formLable}`}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`${formStyles.formTextInput}`}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className={`${formStyles.formLable}`}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`${formStyles.formTextInput}`}
                required
              />
            </div>
          </div>
          {/* Username */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="username" className={`${formStyles.formLable}`}>
                Username
              </label>
              <input
                type="text"
                id="usernmae"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`${formStyles.formTextInput}`}
                required
              />
            </div>
            {/* Email */}
            <div className="w-1/2">
              <label htmlFor="email" className={`${formStyles.formLable}`}>
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${formStyles.formTextInput}`}
                required
              />
            </div>
          </div>
          {/* Contact Number */}
          <div>
            <label htmlFor="contact" className={`${formStyles.formLable}`}>
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`${formStyles.formTextInput}`}
              required
            />
          </div>
          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className={`${formStyles.formLable}`}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${formStyles.formTextInput}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute mt-6 inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/*Error message for password*/}
          {errors.password && (
            <p className="text-primary-shade-1 text-xs italic">
              {errors.password}
            </p>
          )}
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={`${formStyles.formLable}`}
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${formStyles.formTextInput}`}
              required
            />
            {/*Error message for confirm password*/}
            {errors.confirmPassword && (
              <p className="text-primary-shade-1 text-xs italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
          <button type="submit" className={`${formStyles.formPrimaryButton}`}>
            Create an account
          </button>
        </form>
      </div>
      {/* <div className="w-1/4"></div> */}
    </section>
  );
};

export default Register;