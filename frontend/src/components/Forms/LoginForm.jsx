import { useNavigate } from "react-router-dom";
import api from "../../api";
import { formStyles } from "../../styles";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import PrimaryButton from "../Buttons/PrimaryButton";
import GoogleLoginButton from "../Buttons/GoogleLoginButton";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ setErrorMessage, setLoading }) => {
  const navigate = useNavigate();
  const route = "/user/login/";

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.post(route, values);
      // console.log(res.data.data);
      localStorage.setItem("userData", JSON.stringify(res.data.data));
      localStorage.setItem(ACCESS_TOKEN, res.data.auth_tokens.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.auth_tokens.refresh);
      // localStorage.setItem("userType", res.data.data.user_type);

      // setLoggedInUser(res.data.data);
      console.log(
        "Logged in User: ",
        JSON.parse(localStorage.getItem("userData"))
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (
              error.response.data.error ===
              "Invalid domain. Only pdn.ac.lk domain is allowed for Google login."
            ) {
              setErrorMessage(error.response.data.error);
            } else {
              setErrorMessage("An error occurred during login.");
            }
            break;
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
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="email" className={`${formStyles.formLable}`}>
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className={`${formStyles.formTextInput}`}
            />
            <ErrorMessage
              className={`${formStyles.formError}`}
              name="email"
              component="div"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className={`${formStyles.formLable}`}>
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className={`${formStyles.formTextInput}`}
            />
            <ErrorMessage
              className={`${formStyles.formError}`}
              name="password"
              component="div"
            />
          </div>

          <div className="mb-4 flex h-auto items-baseline">
            <Field
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

          <PrimaryButton type="submit" text="Login" disabled={isSubmitting} />
          <GoogleLoginButton />

          <div className="text-center mt-4"></div>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  // setLoggedInUser: PropTypes.func.isRequired,
};

export default LoginForm;
