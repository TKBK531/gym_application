import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { formStyles } from "../../styles";
import Popup from "../../components/Popup";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setPopupType("success");

    // 1. Basic Form Validation (Add more as needed)
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // Clear previous errors
    setErrors({});

    try {
      // 2. Prepare Data for Backend
      const dataForBackend = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        profile: {
          profile_picture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          contact: formData.contact,
        },
      };

      // 3. Send Registration Request using your api instance
      const response = await api.post("/user/register/", dataForBackend);

      // 4. Handle Success
      if (response.status === 201) {
        setShowPopup(true);
        setPopupMessage("Registration successful!");
        setPopupType("success");

        // Optional: Reset form fields, redirect to login, etc.
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      // 5. Handle Errors (Specific & General)
      console.error("Registration error:", error);
      setShowPopup(true);
      setPopupType("error");

      if (error.response) {
        if (error.response.status === 400) {
          // Validation errors
          setPopupMessage(
            "Validation errors: " + JSON.stringify(error.response.data)
          );
        } else if (error.response.status === 409) {
          // Username or email already exists
          setPopupMessage("Username or email already exists.");
          setShowPopup(true);
        } else {
          // Other server errors (500, etc.)
          setPopupMessage("Server error. Please try again later.");
          setShowPopup(true);
        }
      } else if (error.request) {
        // Network error
        setPopupMessage(
          "No response from server. Please check your connection."
        );
        setShowPopup(true);
      } else {
        // Other unexpected errors
        setPopupMessage("An error occurred. Please try again.");
        setShowPopup(true);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (popupType === "success") {
      setErrors({});
      navigate("/login");
    }
  };

  return (
    <>
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

        {/* Email */}
        <div className="w-full">
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

      {/* Popup Component */}
      {showPopup && (
        <Popup message={popupMessage} type={popupType} onClose={closePopup} />
      )}
    </>
  );
};

export default RegistrationForm;
