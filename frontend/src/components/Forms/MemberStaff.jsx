import React, { useState, useEffect } from "react";
import { formStyles } from "../../styles";
import FamilyDetails from "../Table/FamilyDetails";
import api from "../../api";
import membershipPrice from "./prices";

const MemberStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    faculty: "",
    designation: "",
    appointment: "",
    temporary: "",
    upf: "",
    household: "",
    formType: "",
    membership: "",
    mobile: "",
    residence: "",
    address: "",
    email: "",
    familyMembers: 0,
    totalPrice: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/profile/');
        const data = response.data;
        console.log(data);
        const firstName = response.data?.data?.user?.first_name || '';
        const lastName = response.data?.data?.user?.last_name || '';
        const name = `${firstName} ${lastName}`.trim();
        const mobile = response.data?.data?.profile.contact || '';
        const address = response.data?.data?.profile.address || '';
        const email = response.data?.data?.user?.email || '';
        const faculty = response.data?.data?.user_type_data.faculty || '';
        const appointment = response.data?.data?.user_type_data.date_of_appointment || '';
        const upf = response.data?.data?.user_type_data.upf_number || '';

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: name,
          mobile: mobile,
          address: address,
          email: email,
          faculty: faculty,
          appointment: appointment,
          upf: upf
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUser();
  }, []);


  const calculateTotalPrice = () => {
    const { membership, formType, familyMembers } = formData;

    const selectedMembership = membershipPrice.find(
      (item) =>
        item.memberType === membership && item.formType === formType
    );

    if (selectedMembership) {
      const { membershipPrice, monthlyFee } = selectedMembership;
      const total = (membershipPrice + monthlyFee) * (1 + parseInt(familyMembers || 0));
      setFormData((prev) => ({ ...prev, totalPrice: total }));
    } else {
      setFormData((prev) => ({ ...prev, totalPrice: "" }));
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.membership, formData.formType, formData.familyMembers]);


  const handleHouseholdChange = (event) => {
    const selectedHousehold = event.target.value; 
    setFormData((prevData) => ({
      ...prevData,
      household: selectedHousehold, 
      familyMembers: selectedHousehold === "individual" ? 0 : formData.familyMembers,
    }));
  };


  const handleFamilyCountChange = (count) => {
    setFormData((prevData) => ({
      ...prevData,
      familyMembers: count,
    }));
    console.log(formData.familyMembers);
  };

  const handleFormTypeChange = (event) => {
    const selectedFormType = event.target.value; // Get selected value for formType
    setFormData((prevData) => ({
      ...prevData,
      formType: selectedFormType, // Update only formType
    }));
  };

  const handleMembershipChange = (event) => {
    const selectedMembership = event.target.value; // Get selected value for formType
    setFormData((prevData) => ({
      ...prevData,
      membership: selectedMembership, // Update only formType
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const jsonData = formData;

    // console.log(jsonData);
    // You can also send jsonData to your server here
  };


  const [familyDetails, setFamilyDetails] = useState([
    { name: "", age: "", relation: "", occupation: "" },
  ]);


  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              University Staff Form
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Personal</legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    Name (Mr./Mrs./Miss)
                  </label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>
                      Faculty/Dept./Division
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="faculty"
                      placeholder="Enter faculty name"
                      value={formData.faculty}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Designation
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="designation"
                      placeholder="Enter designation (e.g: Professor )"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>
                      Date of Appointment
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="date"
                      name="appointment"
                      value={formData.appointment}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Temporary
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="temporary"
                      placeholder="Specify if temporary (Yes/No)"
                      value={formData.temporary}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>UPF No.</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="upf"
                    placeholder="Enter UPF number"
                    value={formData.upf}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Household Type</label>
                  <select
                    name="household"
                    value={formData.household}
                    onChange={handleHouseholdChange}
                    className={`${formStyles.formTextInput}`}
                  >
                    <option value="">Select household type</option>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                  </select>
                </div>
                
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>
                      Form Type
                    </label>
                    <select
                      name="formType"
                      value={formData.formType}
                      onChange={handleFormTypeChange}
                      className={`${formStyles.formTextInput}`}
                    >
                      <option value="">Select Form type</option>
                      <option value="outsider">Outsider form</option>
                      <option value="staff">Staff Member form</option>
                      <option value="postGraduate">Post Graduate Student form</option>
                    </select>
                  </div>

                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Membership Type
                    </label>
                    <select
                      name="membership"
                      value={formData.membership}
                      onChange={handleMembershipChange}
                      className={`${formStyles.formTextInput}`}
                    >
                      <option value="">Select Membership type</option>
                      <option value="pool">Pool Membership</option>
                      <option value="ground">Ground Membership</option>
                      <option value="gymnasium">Gymnasium Membership</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Contact</legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>Mobile</label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="tel"
                      name="mobile"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Residence
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="tel"
                      name="residence"
                      placeholder="Enter telephone number"
                      value={formData.residence}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Address</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="address"
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Email</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Family Details */}
            {/* {formData.household !== "individual" && <FamilyDetails />} */}
            {formData.household !== "individual" && <FamilyDetails onFamilyCountChange={handleFamilyCountChange}  setFamilyDetails={setFamilyDetails} familyDetails={familyDetails} />}

            {/* Total Price */}
            <div className="py-5 md:flex">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Total Price</legend>
              </div>
              <div className="md:flex-1">
                <input
                  className={`${formStyles.formTextInput}`}
                  type="text"
                  name="totalPrice"
                  placeholder="Auto filled"
                  value={formData.totalPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right">
                <button
                  type="submit"
                  className="text-lg w-full sm:w-1/2 md:w-1/3 shadow appearance-none rounded-xl py-3 px-3 font-bold bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MemberStaff;

