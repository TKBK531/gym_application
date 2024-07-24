import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { faculties } from "../../constants/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formStyles } from "../../styles";
import api from "../../api";

const FinilizationForm = ({ userData, selectedOption }) => {
  const [faculty, setFaculty] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userData.email) {
      const faculty = getFacultyFromEmail(userData.email);
      const userName = getUsernameFromEmail(userData.email);
      if (faculty) {
        setFaculty(faculty);
      }
      if (userName) {
        setUserName(userName.toUpperCase());
      }
    }
  }, [userData.email]);

  const getUsernameFromEmail = (email) => {
    const username = email.split("@")[0];
    return username;
  };

  const getFacultyFromEmail = (email) => {
    const facultyCode = email.split("@")[1].split(".")[0];
    const faculty = faculties.find((faculty) => faculty.code === facultyCode);
    return faculty;
  };

  const initialValues = {
    registration_number: userName,
    faculty: faculty ? faculty.label : "",
    upf_number: "",
    date_of_appointment: "",
    pg_registration_number: "",
    pg_commencement_date: "",
  };

  const validationSchema = Yup.object().shape({
    upf_number:
      selectedOption === "academic"
        ? Yup.string().required("UPF Number is required.")
        : Yup.string(),
    date_of_appointment:
      selectedOption === "academic"
        ? Yup.date().required("Date of Appointment is required.")
        : Yup.date(),
    pg_registration_number:
      selectedOption === "postgraduate"
        ? Yup.string().required("Postgraduate Registration Number is required.")
        : Yup.string(),
    pg_commencement_date:
      selectedOption === "postgraduate"
        ? Yup.date().required("Postgraduate Commencement Date is required.")
        : Yup.date(),
  });

  const sendFinilizeRequest = async (url, dataForBackend) => {
    const response = await api.post(url, dataForBackend);
    console.log("Finilize Response", response.data);
    return response.data;
  };

  const finishButtonClicked = async (values) => {
    if (selectedOption === "student") {
      const dataForBackend = {
        registration_number: userName,
        faculty: faculty.pk,
      };
      console.log(dataForBackend);
      try {
        const responseData = await sendFinilizeRequest(
          "/user/register/profile/student/",
          dataForBackend
        );
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    } else if (selectedOption === "academic") {
      const dataForBackend = {
        upf_number: values.upf_number,
        date_of_appointment: values.date_of_appointment,
        faculty: faculty.pk,
      };
      console.log(dataForBackend);
      try {
        const responseData = await sendFinilizeRequest(
          "/user/register/profile/academic/",
          dataForBackend
        );
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    } else if (selectedOption === "postgraduate") {
      const dataForBackend = {
        pg_registration_number: values.pg_registration_number,
        pg_commencement_date: values.pg_commencement_date,
      };
      console.log(dataForBackend);
      try {
        const responseData = await sendFinilizeRequest(
          "/user/register/profile/postgraduate/",
          dataForBackend
        );
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    window.location.reload();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={finishButtonClicked}
    >
      {({ setFieldValue }) => (
        <Form action="" className="w-full">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {selectedOption === "student" && (
              <div className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="registration_number"
                    className={`${formStyles.formLabel}`}
                  >
                    Registration Number
                  </label>
                  <Field
                    name="registration_number"
                    type="text"
                    disabled
                    value={userName}
                    className={`mt-1 block w-full px-3 py-2 border ${formStyles.formTextInput}`}
                  />
                  <ErrorMessage
                    name="registration_number"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="faculty"
                    className={`${formStyles.formLabel}`}
                  >
                    Faculty
                  </label>
                  <Field
                    name="faculty"
                    type="text"
                    disabled
                    value={faculty ? faculty.label : ""}
                    className={`mt-1 block w-full px-3 py-2 border ${formStyles.formTextInput}`}
                  />
                  <ErrorMessage
                    name="faculty"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>
              </div>
            )}
            {selectedOption === "academic" && (
              <div className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="upf_number"
                    className={`${formStyles.formLabel}`}
                  >
                    UPF Number
                  </label>
                  <Field
                    name="upf_number"
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border ${formStyles.formTextInput}`}
                  />
                  <ErrorMessage
                    name="upf_number"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="faculty"
                    className={`${formStyles.formLabel}`}
                  >
                    Faculty
                  </label>
                  <Field
                    name="faculty"
                    as="select"
                    className={`mt-1 block w-full px-3 py-2 border ${formStyles.formTextInput}`}
                    onChange={(e) => {
                      const selectedFaculty = faculties.find(
                        (faculty) => faculty.label === e.target.value
                      );
                      setFaculty(selectedFaculty);
                      setFieldValue("faculty", e.target.value);
                    }}
                  >
                    <option value="" label="Select Faculty" />
                    {faculties.map((faculty) => (
                      <option key={faculty.code} value={faculty.label}>
                        {faculty.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="faculty"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_of_appointment"
                    className={`${formStyles.formLabel}`}
                  >
                    Date of Appointment
                  </label>
                  <Field
                    name="date_of_appointment"
                    type="date"
                    className={`${formStyles.formTextInput}`}
                  />
                  <ErrorMessage
                    name="date_of_appointment"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>
              </div>
            )}
            {selectedOption === "postgraduate" && (
              <div className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="pg_registration_number"
                    className={`${formStyles.formLabel}`}
                  >
                    Postgraduate Registration Number
                  </label>
                  <Field
                    name="pg_registration_number"
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border ${formStyles.formTextInput}`}
                  />
                  <ErrorMessage
                    name="pg_registration_number"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pg_commencement_date"
                    className={`${formStyles.formLabel}`}
                  >
                    Postgraduate Commencement Date
                  </label>
                  <Field
                    name="pg_commencement_date"
                    type="date"
                    className={`${formStyles.formTextInput}`}
                  />
                  <ErrorMessage
                    name="pg_commencement_date"
                    component="div"
                    className={`${formStyles.formError}`}
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out mt-5 w-full"
            >
              Finish
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

FinilizationForm.propTypes = {
  userData: PropTypes.object.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default FinilizationForm;
