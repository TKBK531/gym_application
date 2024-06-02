import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formStyles } from "../styles";
import LoginForm from "../components/Forms/LoginForm";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    if (error) {
      setErrorMessage(decodeURIComponent(error.replace(/\+/g, " ")));
      // Remove the URL parameters
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

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
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}
          </div>

          <LoginForm
            setErrorMessage={setErrorMessage}
            setLoading={setLoading}
            setLoggedInUser={setLoggedInUser}
          />

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
