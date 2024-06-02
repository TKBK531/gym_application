import React, { useState } from "react";
import { formStyles } from "../../styles";
import FamilyDetails from "../Table/FamilyDetails";

const MemberStaff = () => {
<<<<<<< HEAD
  const [category, setCategory] = useState("");
=======

  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [familyDetails, setFamilyDetails] = useState([
    { name: "", age: "", relation: "", occupation: "" },
  ]);
>>>>>>> ced44ca (FIX : Create Outsiders membership form)

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              University Staff Form
            </h2>
          </div>
          <form>
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
                    placeholder="Acme Mfg. Co."
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
                      placeholder="Faculty of Science"
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
                      placeholder="Professor"
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
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Period of Appointment (if temporary)
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="temporary"
                      placeholder="1 year"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>UPF No.</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="upf"
                    placeholder="000 000"
                  />
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Category</label>
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className={`${formStyles.formTextInput}`}
                  >
                    <option value="">Select Category</option>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                  </select>
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>
                      Form Category
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="category"
                      placeholder="Auto filled"
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Membership Type
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="membership"
                      placeholder="Auto filled"
                    />
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
                      placeholder="0771122333"
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
                      placeholder="0912233444"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Address</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="address"
                    placeholder="425 Galaha Lane, Peradeniya"
                  />
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Email</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="email"
                    name="email"
                    placeholder="contact@acme.co"
                  />
                </div>
              </div>
            </div>

            {/* Family Details */}
            {category !== "individual" && <FamilyDetails />}

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
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="py-4 md:flex mb-6">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">
                  Add Your Image
                </legend>
              </div>
              <div className="md:flex-1 px-3 text-center">
                <div className="bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="file"
                    name="addImage"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right">
                <button
                  type="submit"
                  onClick=""
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
