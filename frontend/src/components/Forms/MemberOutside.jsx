import React, { useState } from "react";
import { formStyles } from "../../styles";
import FamilyDetails from "../Table/FamilyDetails";

const MemberOutside = () => {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    dob: "",
    age: "",
    category: "",
    mobile: "",
    residence: "",
    address: "",
    email: "",
    totalPrice: "",
    addImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Output JSON in console or send it to backend via API
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
                    placeholder="Acme Mfg. Co."
                    value={formData.name}
                    onChange={handleInputChange}
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
                    placeholder="Enter NIC"
                    value={formData.nic}
                    onChange={handleInputChange}
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
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3 mt-4 md:mt-0">
                    <label className={`${formStyles.formLable}`}>Age</label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="age"
                      placeholder="1 year"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`${formStyles.formTextInput}`}
                  >
                    <option value="">Select Category</option>
                    <option value="individual">Individual</option>
                    <option value="couple">Couple</option>
                    <option value="family">Family</option>
                  </select>
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
                      placeholder="0771122333"
                      value={formData.mobile}
                      onChange={handleInputChange}
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
                      placeholder="0912233444"
                      value={formData.residence}
                      onChange={handleInputChange}
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
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>Email</label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="email"
                    name="email"
                    placeholder="contact@acme.co"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {formData.category !== "individual" && <FamilyDetails />}

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
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="py-4 flex flex-col md:flex-row mb-6">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">
                  Add Your Image
                </legend>
              </div>
              <div className="md:flex-1 px-3 text-center">
                <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="file"
                    name="addImage"
                    onChange={handleFileChange}
                  />
                </div>
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


// import React, { useState } from "react";
// import { formStyles } from "../../styles";
// import FamilyDetails from "../Table/FamilyDetails";

// const MemberOutside = () => {
//   const [category, setCategory] = useState("");

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   return (
//     <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
//       <main className="flex-1 p-4 sm:p-6 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
//         <section className="bg-cream-lighter p-4 shadow">
//           <div className="flex flex-col md:flex-row">
//             <h2 className="w-full md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
//               Non University Form
//             </h2>
//           </div>
//           <form>
//             <div className="flex flex-col md:flex-row mb-8">
//               <div className="md:w-1/3">
//                 <legend className="tracking-wide text-sm">Personal</legend>
//               </div>
//               <div className="md:flex-1 mt-2 md:mt-0 md:px-3">
//                 <div className="mb-4">
//                   <label className={`${formStyles.formLable}`}>
//                     Name (Mr./Ms.)
//                   </label>
//                   <input
//                     className={`${formStyles.formTextInput}`}
//                     type="text"
//                     name="name"
//                     placeholder="Acme Mfg. Co."
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className={`${formStyles.formLable}`}>
//                     National Identity Card No.
//                   </label>
//                   <input
//                     className={`${formStyles.formTextInput}`}
//                     type="text"
//                     name="name"
//                     placeholder="Acme Mfg. Co."
//                   />
//                 </div>
//                 <div className="flex flex-col md:flex-row mb-4">
//                   <div className="md:flex-1 md:pr-3">
//                     <label className={`${formStyles.formLable}`}>
//                       Date of Birth
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="date"
//                       name="appointment"
//                       placeholder="2000/01/01"
//                     />
//                   </div>
//                   <div className="md:flex-1 md:pl-3 mt-4 md:mt-0">
//                     <label className={`${formStyles.formLable}`}>
//                       Age
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="text"
//                       name="tempory"
//                       placeholder="1 year"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className={`${formStyles.formLable}`}>
//                     Category
//                   </label>
//                   <select
//                     value={category}
//                     onChange={handleCategoryChange}
//                     className={`${formStyles.formTextInput}`}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="individual">Individual</option>
//                     <option value="couple">Couple</option>
//                     <option value="family">Family</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row mb-8">
//               <div className="md:w-1/3">
//                 <legend className="tracking-wide text-sm">Contact</legend>
//               </div>
//               <div className="md:flex-1 mt-2 md:mt-0 md:px-3">
//                 <div className="flex flex-col md:flex-row mb-4">
//                   <div className="md:flex-1 md:pr-3">
//                     <label className={`${formStyles.formLable}`}>
//                       Mobile
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="tel"
//                       name="mobile"
//                       placeholder="0771122333"
//                     />
//                   </div>
//                   <div className="md:flex-1 md:pr-3 mt-4 md:mt-0">
//                     <label className={`${formStyles.formLable}`}>
//                       Residence
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="tel"
//                       name="residence"
//                       placeholder="0912233444"
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className={`${formStyles.formLable}`}>
//                     Address
//                   </label>
//                   <input
//                     className={`${formStyles.formTextInput}`}
//                     type="text"
//                     name="address"
//                     placeholder="425 Galaha Lane, Peradeniya"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className={`${formStyles.formLable}`}>
//                     Email
//                   </label>
//                   <input
//                     className={`${formStyles.formTextInput}`}
//                     type="email"
//                     name="email"
//                     placeholder="contact@acme.co"
//                   />
//                 </div>
//               </div>
//             </div>

//             {category !== "individual" && <FamilyDetails />}

//             <div className="py-5 flex flex-col md:flex-row">
//               <div className="md:w-1/3">
//                 <legend className="tracking-wide text-sm">Total Price</legend>
//               </div>
//               <div className="mb-4">
//                 <input
//                   className={`${formStyles.formTextInput}`}
//                   type="text"
//                   name="name"
//                   placeholder="Auto filled"
//                 />
//               </div>
//             </div>

//             <div className="py-4 flex flex-col md:flex-row mb-6">
//               <div className="md:w-1/3">
//                 <legend className="tracking-wide text-sm">Add Your Image</legend>
//               </div>
//               <div className="md:flex-1 px-3 text-center">
//                 <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
//                   <input
//                     className={`${formStyles.formTextInput}`}
//                     type="file"
//                     name="addImage"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
//               <div className="md:flex-1 px-3 text-center md:text-right">
//                 <button
//                   type="submit"
//                   onClick=""
//                   className="text-lg w-full sm:w-1/2 md:w-1/3 shadow appearance-none rounded-xl py-3 px-3 font-bold bg-yellow-400 text-black hover:bg-yellow-500"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </form>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default MemberOutside;
