import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emptyProfileImg from "../../assets/profile/empty_profile_pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { formStyles } from "../../styles";
import PrimaryButton from "../Buttons/PrimaryButton";
import { cities, provinces } from "../../constants/index";
import PropTypes from "prop-types";

const RegistrationForm2 = ({ respData }) => {
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const emptyImg = emptyProfileImg;
  useEffect(() => {
    if (selectedProvince) {
      const filtered = cities.filter(
        (city) => city.province === selectedProvince
      );
      setFilteredCities(filtered);
      setShowCityDropdown(true);
    } else {
      setShowCityDropdown(false);
    }
  }, [selectedProvince]);

  const initialValues = {
    national_id: "",
    contact: "",
    profile_picture: null,
    date_of_birth: "",
    province: "",
    city: "",
  };

  const validationSchema = Yup.object().shape({
    national_id: Yup.string()
      .required("National ID is required")
      .matches(/^(\d{9}[Vv]|\d{12})$/, "Not a Valid ID Number"),
    contact: Yup.string().required("Contact is required"),
    date_of_birth: Yup.date()
      .required("Date of Birth is required")
      .test("age", "Invalid birthdate", (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age > 10 && age < 100;
      }),
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

  const handleSubmit = async (values) => {
    const data = {
      identifier: respData.identifier,
      profile_picture: values.profile_picture,
      national_id: values.national_id,
      contact: values.contact,
      date_of_birth: values.date_of_birth,
      province: values.province,
      city: values.city,
    };

    console.log(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
            onChange={(e) => {
              setFieldValue("province", e.target.value);
              const filtered = cities.filter(
                (city) => city.province === e.target.value
              );
              setFilteredCities(filtered);
              setShowCityDropdown(true);
              setFieldValue("city", "");
            }}
          >
            <option value="" label="Select Province" />
            {provinces.map((province) => (
              <option key={province.id} value={province.label}>
                {province.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="province"
            component="div"
            className={`${formStyles.formError}`}
          />

          {showCityDropdown && (
            <>
              <Field
                as="select"
                name="city"
                className={`${formStyles.formTextInput}`}
              >
                <option value="" label="Select city" />
                {filteredCities.map((city) => (
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
            </>
          )}

          <PrimaryButton type="submit" text="Finish" />
        </Form>
      )}
    </Formik>
  );
};

RegistrationForm2.propTypes = {
  respData: PropTypes.object,
};

export default RegistrationForm2;
