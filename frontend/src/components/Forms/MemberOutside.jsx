import { useState, useEffect } from "react";
import { formStyles } from "../../styles";
import FamilyDetails from "../Table/FamilyDetails";
import api from "../../api";
import Prices from "./prices";
import { toast } from "react-toastify";

const MemberOutside = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    dob: "",
    age: "",
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

  const [familyDetails, setFamilyDetails] = useState([
    { name: "", age: "", relation: "", nic: "" },
  ]);

  const handleFamilyDetailsChange = (details) => {
    setFamilyDetails(details);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/profile/");
        const data = response.data;
        console.log(data);
        const firstName = response.data?.data?.user?.first_name || "";
        const lastName = response.data?.data?.user?.last_name || "";
        const name = `${firstName} ${lastName}`.trim();
        const nic = response.data?.data?.profile.national_id || "";
        const dob = response.data?.data?.profile.date_of_birth || "";
        const mobile = response.data?.data?.profile.contact || "";
        const address = response.data?.data?.profile.address || "";
        const email = response.data?.data?.user?.email || "";

        // Calculate age from DOB
        const calculateAge = (dateOfBirth) => {
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          // Adjust if the birth month hasn't occurred this year
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age;
        };

        const age = dob ? calculateAge(dob) : ""; // Calculate age only if DOB exists

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: name,
          nic: nic,
          dob: dob,
          age: age, // Include the calculated age
          mobile: mobile,
          address: address,
          email: email,
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchUser();
  }, []);

  const calculateTotalPrice = () => {
    const { membership, formType, familyMembers } = formData;
    console.log("Membership", membership);
    console.log("formtype", formType);
    console.log("familymem", familyMembers);
    const selectedMembership = Prices.find(
      (item) => item.memberType === membership && item.formType === formType
    );
    console.log("Selected Membership", selectedMembership);

    console.log(Prices);

    if (selectedMembership) {
      const { membershipPrice, monthlyFee } = selectedMembership;
      const total =
        (membershipPrice + monthlyFee) * (1 + parseInt(familyMembers || 0));
      setFormData((prev) => ({ ...prev, totalPrice: total }));
      console.log("Total", formData.totalPrice);
      console.log("Count", formData.familyMembers);
    } else {
      setFormData((prev) => ({ ...prev, totalPrice: "" }));
    }

    console.log("Total Price", formData.totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.membership, formData.formType, formData.familyMembers]);

  const handleHouseholdChange = (event) => {
    const selectedHousehold = event.target.value; // Get selected value for household
    setFormData((prevData) => ({
      ...prevData,
      household: selectedHousehold, // Update only household
      familyMembers:
        selectedHousehold === "individual" ? 0 : formData.familyMembers,
    }));
  };

  const handleFamilyCountChange = (count) => {
    setFormData((prevData) => ({
      ...prevData,
      familyMembers: count,
    }));
    // console.log(formData.familyMembers);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const req_data = {
      members: {
        age: formData.age,
        household: formData.household,
        formType: formData.formType,
        membership: formData.membership,
        residence: formData.residence,
        price: formData.totalPrice,
      },
      family: {
        family_members: familyDetails.map((member) => ({
          name: member.name,
          nic: member.nic,
          relationship: member.relation,
          age: member.age,
        })),
      },
    };

    console.log("Form Data", req_data);

    try {
      const response = await api.post("/member/outsiders-members/create/", req_data);
      console.log("Response", response.data);
      toast.success("Member registered successfully");

      setFormData((prevFormData) => ({
        ...prevFormData,
        household: "",
        formType: "",
        membership: "",
        residence: "",
        familyMembers: 0,
        totalPrice: "",
      }));
      setFamilyDetails([{ name: "", age: "", relation: "", nic: "" }]);

      window.location.reload();

    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error creating announcement");
    }
  };

  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 p-4 sm:p-6 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="flex flex-col md:flex-row">
            <h2 className="w-full md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              Non University Form
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Personal</legend>
              </div>
              <div className="md:flex-1 mt-2 md:mt-0 md:px-3">
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    Name (Mr./Ms.)
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
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    National Identity Card No.
                  </label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="nic"
                    placeholder="Enter NIC number"
                    value={formData.nic}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row mb-4">
                  <div className="md:flex-1 md:pr-3">
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
                  <div className="md:flex-1 md:pl-3 mt-4 md:mt-0">
                    <label className={`${formStyles.formLable}`}>Age</label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="age"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    Household Type
                  </label>
                  <select
                    name="household"
                    value={formData.household}
                    onChange={handleHouseholdChange}
                    className={`${formStyles.formTextInput}`}
                  >
                    <option value="">Select household type</option>
                    <option value="individual">Individual</option>
                    <option value="couple">Couple</option>
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
                      <option value="postGraduate">
                        Post Graduate Student form
                      </option>
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

            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Contact</legend>
              </div>
              <div className="md:flex-1 mt-2 md:mt-0 md:px-3">
                <div className="flex flex-col md:flex-row mb-4">
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
                  <div className="md:flex-1 md:pr-3 mt-4 md:mt-0">
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

            {formData.household !== "individual" && (
              <FamilyDetails onFamilyCountChange={handleFamilyCountChange} setFamilyDetails={setFamilyDetails} familyDetails={familyDetails} />
            )}
            {/* {category !== "individual" && <FamilyDetails />} */}

            <div className="py-5 flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Total Price</legend>
              </div>
              <div className="mb-4">
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

export default MemberOutside;