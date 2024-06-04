import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { formStyles } from "../../styles";
import Popup from "../../components/Popup";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PrimaryButton from "../Buttons/PrimaryButton";
import GoogleLoginButton from "../Buttons/GoogleLoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { cities } from "../../constants/index";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
  confirmPassword: "",
  userType: 2,
  nationalId: "",
  city: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required"),
  contact: Yup.string().required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character"
    )
    .min(8, "Must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
  nationalId: Yup.string()
    .required("This field is required")
    .matches(/^(\d{9}[Vv]|\d{12})$/, "Not a Valid ID Number"),
  city: Yup.string().required("This field is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const handleRegister = async (values) => {
    try {
      const dataForBackend = {
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        profile: {
          profile_picture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          contact: values.contact,
          user_type: 2,
          national_id: values.nationalId,
          city: values.city,
        },
      };

      const response = await api.post("/user/register/", dataForBackend);
      if (response.status === 201) {
        // Successful registration
        setPopupMessage("Registration successful!");
        setPopupType("success");
        setShowPopup(true);
      } else {
        // More specific unexpected response handling
        throw new Error(
          `Unexpected status code ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      setPopupType("error");

      // Enhanced error message extraction
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Prioritize detailed error messages from the backend
        if (typeof errorData === "string") {
          setPopupMessage(errorData);
        } else if (errorData.message) {
          setPopupMessage(errorData.message);
        } else {
          setPopupMessage(
            errorData.error || "An unexpected server error occurred."
          );
        }

        // Additional checks for common error scenarios
        if (error.response.status === 409) {
          setPopupMessage("Username or email already exists.");
        }
      } else if (error.request) {
        setPopupMessage(
          "No response from server. Please check your connection."
        );
      } else {
        setPopupMessage(
          error.message || "An error occurred. Please try again."
        );
      }
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (popupType === "success") {
      navigate("/login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched }) => (
          <Form className="mt-10 space-y-4 mx-auto p-4 rounded-md">
            {/* First and Last Name (on a single row for larger screens) */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="md:w-1/2">
                <label htmlFor="firstName" className={formStyles.formLabel}>
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`${formStyles.formTextInput} ${
                    touched.firstName && errors.firstName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className={`${formStyles.formError}`}
                />
              </div>

              <div className="md:w-1/2 mt-4 md:mt-0">
                {" "}
                {/* Add margin-top for smaller screens */}
                <label htmlFor="lastName" className={formStyles.formLabel}>
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`${formStyles.formTextInput} ${
                    touched.lastName && errors.lastName ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className={`${formStyles.formError}`}
                />
              </div>
            </div>

            {/* Email and UserType (full width) */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-1/2">
                <label htmlFor="email" className={formStyles.formLabel}>
                  Email address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`${formStyles.formTextInput} ${
                    touched.email && errors.email ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={`${formStyles.formError}`}
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="userType" className={formStyles.formLabel}>
                  User Type
                </label>
                <input
                  type="text"
                  id="userType"
                  name="userType"
                  value="External"
                  disabled
                  className={`${formStyles.formTextInput} ${
                    touched.userType && errors.userType ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>

            {/* National ID and City */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-1/2">
                <label htmlFor="nationalId" className={formStyles.formLabel}>
                  National ID Number
                </label>
                <Field
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  className={`${formStyles.formTextInput} ${
                    touched.nationalId && errors.nationalId
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="nationalId"
                  component="div"
                  className={`${formStyles.formError}`}
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="city" className={formStyles.formLabel}>
                  City
                </label>
                <Field
                  as="select"
                  id="city"
                  name="city"
                  className={`${formStyles.formTextInput} ${
                    touched.city && errors.city ? "border-red-500" : ""
                  }`}
                >
                  <option value="" label="Select city" />
                  {cities.map((city) => (
                    <option key={city.pk} value={city.pk}>
                      {city.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="city"
                  component="div"
                  className={`${formStyles.formError}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact" className={formStyles.formLabel}>
                Contact Number
              </label>
              <Field
                type="tel"
                id="contact"
                name="contact"
                className={`${formStyles.formTextInput} ${
                  touched.contact && errors.contact ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="contact"
                component="div"
                className={`${formStyles.formError}`}
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="relative">
              <label htmlFor="password" className={formStyles.formLabel}>
                Password
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`${formStyles.formTextInput} ${
                  touched.password && errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={`${formStyles.formError}`}
            />

            <div className="relative">
              <label htmlFor="confirmPassword" className={formStyles.formLabel}>
                Confirm Password
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={`${formStyles.formTextInput} ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 text-gray-600" // adjusted the mt to 1 from 6
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={`${formStyles.formError}`}
            />

            {/* (Submit Button) */}
            <div className="flex flex-col justify-center items-center">
              <PrimaryButton type="submit" text="Create Account" />
              <GoogleLoginButton />
            </div>
          </Form>
        )}
      </Formik>
      {/* Popup Component */}
      {showPopup && (
        <Popup message={popupMessage} type={popupType} onClose={closePopup} />
      )}
    </>
  );
};

export default RegistrationForm;
