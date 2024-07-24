import { Formik, Form, Field, ErrorMessage } from "formik";
import PrimaryButton from "../Buttons/PrimaryButton";
import GoogleLoginButton from "../Buttons/GoogleLoginButton";
import * as Yup from "yup";
import { formStyles } from "../../styles";
import api from "../../api";
import PropTypes from "prop-types";

const RegistrationForm1 = ({ setPageNumber, setRespData }) => {
  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Initial values for form fields
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
    };

    const response = await api.post("/user/register2/", data);
    console.log(response.data);
    setRespData(response.data);
    setPageNumber(2);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="flex flex-row w-full gap-5">
            {/* First Name */}
            <div className="w-full">
              <label htmlFor="firstName" className={`${formStyles.formLabel}`}>
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.firstName && touched.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } ${formStyles.formTextInput}`}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={`${formStyles.formError}`}
              />
            </div>
            {/* Last Name */}
            <div className="w-full">
              <label htmlFor="lastName" className={`${formStyles.formLabel}`}>
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.lastName && touched.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } ${formStyles.formTextInput}`}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className={`${formStyles.formError}`}
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className={`${formStyles.formLabel}`}>
              Email
            </label>
            <Field
              name="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              } ${formStyles.formTextInput}`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={`${formStyles.formError}`}
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className={`${formStyles.formLabel}`}>
              Password
            </label>
            <Field
              name="password"
              type="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password && touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              } ${formStyles.formTextInput}`}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={`${formStyles.formError}`}
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className={`${formStyles.formLabel}`}
            >
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } ${formStyles.formTextInput}`}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={`${formStyles.formError}`}
            />
          </div>
          {/* Submit Button */}
          <div className="flex flex-col justify-center items-center">
            <PrimaryButton type="submit" text="Next" />
            <GoogleLoginButton />
          </div>
        </Form>
      )}
    </Formik>
  );
};

RegistrationForm1.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
  setRespData: PropTypes.func.isRequired,
};

export default RegistrationForm1;
