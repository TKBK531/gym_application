import { formStyles } from "../../styles";
import React, { useState, useEffect } from "react";
import api from "../../api";

const MemberPostG = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    dob: "",
    age: "",
    formType: "",
    membership: "",
    mobile: "",
    residence: "",
    address: "",
    email: "",
    pgInstituteName: "",
    registration: "",
    studentId: "",
    commencement: "",
    completion: "",
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
        const nic = response.data?.data?.profile.national_id || '';
        const dob = response.data?.data?.profile.date_of_birth || '';
        const mobile = response.data?.data?.profile.contact || '';
        const address = response.data?.data?.profile.address || '';
        const email = response.data?.data?.user?.email || '';
        const registration = response.data?.data?.user_type_data.pg_registration_number || '';
        const commencement = response.data?.data?.user_type_data.pg_commencement_date || '';

                // Calculate age from DOB
        const calculateAge = (dateOfBirth) => {
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
        
          // Adjust if the birth month hasn't occurred this year
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
          };
        
        const age = dob ? calculateAge(dob) : ''; // Calculate age only if DOB exists
        
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: name,
          nic: nic,
          dob: dob,
          age: age,
          mobile: mobile,
          address: address,
          email: email,
          registration: registration,
          commencement: commencement
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUser();
  }, []);
  
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

    console.log(jsonData);
    // You can also send jsonData to your server here
  };

  return (
    <div>
      <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
        <main className="flex-1 p-4 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
          <section className="bg-cream-lighter p-4 shadow">
            <div className="flex flex-col md:flex-row">
              <h2 className="w-full md:w-1/2 uppercase tracking-wide text-base sm:text-lg mb-6">
                University Post Graduate Form
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/3">
                  <legend className="tracking-wide text-sm">Personal</legend>
                </div>
                <div className="w-full md:w-2/3 mt-2 md:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className={`${formStyles.formLable}`}>
                      Name (Mr./Ms.)
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className={`${formStyles.formLable}`}>
                      National Identity Card No.
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="Enter NIC number"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
                      <label className={`${formStyles.formLable}`}>
                        Date of Birth
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className={`${formStyles.formLable}`}>Age</label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                      />
                    </div>
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

              <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/3">
                  <legend className="tracking-wide text-sm">Contact</legend>
                </div>
                <div className="w-full md:w-2/3 mt-2 md:mt-0 md:px-3">
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
                      <label className={`${formStyles.formLable}`}>
                        Mobile
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className={`${formStyles.formLable}`}>
                        Residence
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="tel"
                        name="residence"
                        value={formData.residence}
                        onChange={handleChange}
                        placeholder="Enter telephone number"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={`${formStyles.formLable}`}>Address</label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                    />
                  </div>
                  <div className="mb-4">
                    <label className={`${formStyles.formLable}`}>Email</label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/3">
                  <legend className="tracking-wide text-sm">
                    Postgraduate Institute
                  </legend>
                </div>
                <div className="w-full md:w-2/3 mt-2 md:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className={`${formStyles.formLable}`}>
                      Postgraduate Institute Name
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="pgInstituteName"
                      value={formData.pgInstituteName}
                      onChange={handleChange}
                      placeholder="Enter postgraduate institute name"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
                      <label className={`${formStyles.formLable}`}>
                        Registration No.
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="text"
                        name="registration"
                        value={formData.registration}
                        onChange={handleChange}
                        placeholder="Enter registration number"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className={`${formStyles.formLable}`}>
                        Students Identity Card No.
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        placeholder="Enter student ID"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
                      <label className={`${formStyles.formLable}`}>
                        Date of commencement of the course
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="date"
                        name="commencement"
                        value={formData.commencement}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className={`${formStyles.formLable}`}>
                        Date of completion of the course
                      </label>
                      <input
                        className={`${formStyles.formTextInput}`}
                        type="date"
                        name="completion"
                        value={formData.completion}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-5 flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                  <legend className="tracking-wide text-sm">Total Price</legend>
                </div>
                <div className="w-full mb-4">
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleChange}
                    placeholder="Auto filled"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row mb-6 border-t border-b-0 border-l-0 border-r-0 border-cream-dark">
                <div className="w-full md:w-2/3 px-3 text-center md:text-right">
                  <button
                    type="submit"
                    className="text-lg w-full md:w-1/3 shadow appearance-none rounded-xl py-3 px-3 font-bold bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MemberPostG;

