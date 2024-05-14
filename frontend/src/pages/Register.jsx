import React, { useState } from "react";
import { formStyles } from "../styles";

const Register = () => {
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
    alert(
      formData.firstName +
        " " +
        formData.lastName +
        " " +
        formData.email +
        " " +
        formData.contact +
        " " +
        formData.password +
        " " +
        formData.confirmPassword
    );
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

    // // API Submission Logic (Placeholder)
    // try {
    //   const response = await fetch("/your-api-endpoint/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //   // Handle API response (success/error)
    // } catch (error) {
    //   // Handle network or API errors
    // }
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
