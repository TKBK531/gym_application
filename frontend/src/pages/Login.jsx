import React, { useState } from "react";
import { formStyles } from "../styles";
import { useMutation } from "@tanstack/react-query"; // Import useMutation

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null); // Add state for error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("/your-api-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json(); // Assuming the response contains user data
    },
    onSuccess: (data) => {
      // Login successful, handle response data (e.g., redirect)
      console.log("Login successful:", data);
      setLoginError(null); // Clear any previous error
    },
    onError: (error) => {
      // Login failed, handle error (e.g., display error message)
      console.error("Login failed:", error.message);
      setLoginError(error.message); // Set the error message
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData); // Trigger the mutation
  };

  return (
    <section className="flex">
      <div className="w-1/2 p-20">
        <div className="container mx-auto max-w-lg p-8 bg-white rounded-lg shadow-md">
          <div className="container">
            <h1 className="w-full flex flex-col uppercase items-center text-heading3 font-medium mb-3">
              Welcome Back
            </h1>
            <p className="flex flex-col items-center text-sub mb-6">
              Please enter your details.
            </p>

            <form>
              <div className="mb-4">
                <label htmlFor="email" className={`${formStyles.formLable}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
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
                  name="psw"
                  id="psw"
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
              {loginError && (
                <div className="text-red-500 text-sm mt-2">{loginError}</div> // Display error message
              )}
              <button
                type="submit"
                disabled={isLoading} // Disable the button while loading
                className="bg-primary-red text-white py-3 rounded-md transition-colors duration-300 ease-in-out hover:bg-primary-shade-2 w-full text-sub mb-3"
              >
                {isLoading ? "Logging in..." : "Login"}
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
                href="#"
                className={`ml-3 text-primary-shade-1 hover:underline`}
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2">Right Side</div>
    </section>
  );
};

export default Login;
