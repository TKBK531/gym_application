import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const StudentData = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      registrationNumber: "",
      phoneNumber: "",
      faculty: "",
      sportsExperiences: "",
      achievements: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      registrationNumber: Yup.string().required("Registration number is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
      faculty: Yup.string().required("Please select a faculty"),
      achievements: Yup.array()
        .min(1, "Please select at least one achievement")
        .required("Please select at least one achievement"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Replace with actual submission logic
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4">
        <h1 className="text-2xl text-center font-semibold mb-6">Student Details</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className={`w-full border rounded-lg p-2 focus:ring-2 ${formik.touched.name && formik.errors.name
                ? "border-red-500 ring-red-500"
                : "border-gray-300 focus:ring-yellow-500"
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            ) : null}
          </div>

          {/* Registration Number Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              placeholder="Enter your registration number"
              className={`w-full border rounded-lg p-2 focus:ring-2 ${formik.touched.registrationNumber && formik.errors.registrationNumber
                ? "border-red-500 ring-red-500"
                : "border-gray-300 focus:ring-yellow-500"
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationNumber}
            />
            {formik.touched.registrationNumber && formik.errors.registrationNumber ? (
              <p className="text-red-500 text-sm">{formik.errors.registrationNumber}</p>
            ) : null}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className={`w-full border rounded-lg p-2 focus:ring-2 ${formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "border-red-500 ring-red-500"
                : "border-gray-300 focus:ring-yellow-500"
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
            ) : null}
          </div>

          {/* Faculty Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
            <select
              name="faculty"
              className={`w-full border rounded-lg p-2 focus:ring-2 ${formik.touched.faculty && formik.errors.faculty
                ? "border-red-500 ring-red-500"
                : "border-gray-300 focus:ring-yellow-500"
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.faculty}
            >
              <option value="" disabled>
                Select Faculty
              </option>
              <option value="agriculture">Faculty of Agriculture</option>
              <option value="arts">Faculty of Arts</option>
              <option value="dental-sciences">Faculty of Dental Sciences</option>
              <option value="engineering">Faculty of Engineering</option>
              <option value="management">Faculty of Management</option>
              <option value="medicine">Faculty of Medicine</option>
              <option value="science">Faculty of Science</option>
              <option value="veterinary-medicine">
                Faculty of Veterinary Medicine and Animal Science
              </option>
              <option value="allied-health-sciences">
                Faculty of Allied Health Sciences
              </option>
            </select>
            {formik.touched.faculty && formik.errors.faculty ? (
              <p className="text-red-500 text-sm">{formik.errors.faculty}</p>
            ) : null}
          </div>

          {/* Sports Experiences Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sports Experiences
            </label>
            <textarea
              name="sportsExperiences"
              placeholder="Describe your sports experiences"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sportsExperiences}
            ></textarea>
          </div>

          {/* Achievements Checkboxes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
            <div className="flex flex-col gap-2">
              {["District Level", "Province Level", "National Level", "International Level"].map(
                (achievement) => (
                  <label key={achievement} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="achievements"
                      value={achievement}
                      checked={formik.values.achievements.includes(achievement)}
                      onChange={(e) => {
                        const { value } = e.target;
                        let newAchievements = [...formik.values.achievements];
                        if (newAchievements.includes(value)) {
                          newAchievements = newAchievements.filter((a) => a !== value);
                        } else {
                          newAchievements.push(value);
                        }
                        formik.setFieldValue("achievements", newAchievements);
                      }}
                      className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <span>{achievement}</span>
                  </label>
                )
              )}
            </div>
            {formik.touched.achievements && formik.errors.achievements ? (
              <p className="text-red-500 text-sm">{formik.errors.achievements}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentData;
