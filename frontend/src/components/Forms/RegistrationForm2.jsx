import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emptyProfileImg from "../../assets/profile/empty_profile_pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { formStyles } from "../../styles";
import PrimaryButton from "../Buttons/PrimaryButton";

const RegistrationForm2 = () => {
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const emptyImg = emptyProfileImg;
  const initialValues = {
    national_id: "",
    contact: "",
    profile_picture: null,
    date_of_birth: "",
    province: "",
    city: "",
  };

  const validationSchema = Yup.object().shape({
    national_id: Yup.string().required("National ID is required"),
    contact: Yup.string().required("Contact is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    province: Yup.string().required("Province is required"),
    city: Yup.string().required("City is required"),
  });

  const handleProfilePictureChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profile_picture", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4">
          <div className="mt-4 flex flex-col text-center items-center">
            <div
              className="relative cursor-pointer"
              onClick={() => document.getElementById("profile_picture").click()}
            >
              <img
                src={profilePicturePreview ? profilePicturePreview : emptyImg}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
              <div className="absolute top-0 left-0 rounded-full right-0 bottom-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-white w-6 h-6"
                />
              </div>
            </div>

            <input
              id="profile_picture"
              name="profile_picture"
              type="file"
              onChange={(event) =>
                handleProfilePictureChange(event, setFieldValue)
              }
              className="hidden"
            />
          </div>
          <Field
            name="national_id"
            type="text"
            className={`${formStyles.formTextInput}`}
            placeholder="National ID"
          />
          <ErrorMessage
            name="national_id"
            component="div"
            className={`${formStyles.formError}`}
          />

          <Field
            name="contact"
            type="text"
            className={`${formStyles.formTextInput}`}
            placeholder="Contact"
          />
          <ErrorMessage
            name="contact"
            component="div"
            className={`${formStyles.formError}`}
          />

          <Field
            name="date_of_birth"
            type="date"
            className={`${formStyles.formTextInput}`}
          />
          <ErrorMessage
            name="date_of_birth"
            component="div"
            className={`${formStyles.formError}`}
          />

          <Field
            name="province"
            as="select"
            className={`${formStyles.formTextInput}`}
          >
            <option value="">Select Province</option>
            {/* Populate with actual province options */}
          </Field>
          <ErrorMessage
            name="province"
            component="div"
            className={`${formStyles.formError}`}
          />

          <Field
            name="city"
            type="text"
            className={`${formStyles.formTextInput}`}
            placeholder="City"
          />
          <ErrorMessage
            name="city"
            component="div"
            className={`${formStyles.formError}`}
          />

          <PrimaryButton type="submit" text="Finish" />
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm2;
