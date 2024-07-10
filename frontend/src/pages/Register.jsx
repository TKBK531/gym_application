import { formStyles } from "../styles";
import RegistrationForm from "../components/Forms/RegistrationForm";
import RegistrationForm1 from "../components/Forms/RegistrationForm1";

const Register = () => {
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
        <RegistrationForm1 />
      </div>
    </section>
  );
};

export default Register;
