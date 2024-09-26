import { formStyles } from "../../styles";
import { useState } from "react";

const MemberPostG = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    dob: "",
    age: "",
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
    addImage: null, // For the file input
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value, // handle file input separately
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a JSON object from the form data
    const jsonData = {
      name: formData.name,
      id: formData.id,
      dob: formData.dob,
      age: formData.age,
      mobile: formData.mobile,
      residence: formData.residence,
      address: formData.address,
      email: formData.email,
      pgInstituteName: formData.pgInstituteName,
      registration: formData.registration,
      studentId: formData.studentId,
      commencement: formData.commencement,
      completion: formData.completion,
      totalPrice: formData.totalPrice,
      addImage: formData.addImage ? formData.addImage.name : null // only store the file name or handle file separately
    };

    console.log("Submitted Data:", jsonData);
    // You can now send jsonData to your backend if needed
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
                      placeholder="Acme Mfg. Co."
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
                      placeholder="11111111111"
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
                        placeholder="2000/01/01"
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
                        placeholder="25"
                      />
                    </div>
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
                        placeholder="0771122333"
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
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="425 Galaha Lane, Peradeniya"
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
                      placeholder="contact@acme.co"
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
                      placeholder="PGIS"
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
                        placeholder="22222"
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
                        placeholder="22222"
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

              <div className="py-4 flex flex-col md:flex-row mb-6">
                <div className="w-full md:w-1/3">
                  <legend className="tracking-wide text-sm">
                    Add Your Image
                  </legend>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="file"
                      name="addImage"
                      onChange={handleChange}
                    />
                  </div>
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


// import { formStyles } from "../../styles";

// const MemberPostG = () => {
//   return (
//     <div>
//       <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
//         <main className="flex-1 p-4 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
//           <section className="bg-cream-lighter p-4 shadow">
//             <div className="flex flex-col md:flex-row">
//               <h2 className="w-full md:w-1/2 uppercase tracking-wide text-base sm:text-lg mb-6">
//                 University Post Graduate Form
//               </h2>
//             </div>
//             <form>
//               <div className="flex flex-col md:flex-row mb-8">
//                 <div className="w-full md:w-1/3">
//                   <legend className="tracking-wide text-sm">Personal</legend>
//                 </div>
//                 <div className="w-full md:w-2/3 mt-2 md:mt-0 md:px-3">
//                   <div className="mb-4">
//                     <label className={`${formStyles.formLable}`}>
//                       Name (Mr./Ms.)
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="text"
//                       name="name"
//                       placeholder="Acme Mfg. Co."
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className={`${formStyles.formLable}`}>
//                       National Identity Card No.
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="text"
//                       name="id"
//                       placeholder="11111111111"
//                     />
//                   </div>
//                   <div className="flex flex-col md:flex-row mb-4">
//                     <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
//                       <label className={`${formStyles.formLable}`}>
//                         Date of Birth
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="date"
//                         name="dob"
//                         placeholder="2000/01/01"
//                       />
//                     </div>
//                     <div className="w-full md:w-1/2">
//                       <label className={`${formStyles.formLable}`}>
//                         Age
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="number"
//                         name="age"
//                         placeholder="25"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row mb-8">
//                 <div className="w-full md:w-1/3">
//                   <legend className="tracking-wide text-sm">Contact</legend>
//                 </div>
//                 <div className="w-full md:w-2/3 mt-2 md:mt-0 md:px-3">
//                   <div className="flex flex-col md:flex-row mb-4">
//                     <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
//                       <label className={`${formStyles.formLable}`}>
//                         Mobile
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="tel"
//                         name="mobile"
//                         placeholder="0771122333"
//                       />
//                     </div>
//                     <div className="w-full md:w-1/2">
//                       <label className={`${formStyles.formLable}`}>
//                         Residence
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="tel"
//                         name="residence"
//                         placeholder="0912233444"
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className={`${formStyles.formLable}`}>
//                       Address
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="text"
//                       name="address"
//                       placeholder="425 Galaha Lane, Peradeniya"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className={`${formStyles.formLable}`}>
//                       Email
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="email"
//                       name="email"
//                       placeholder="contact@acme.co"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row mb-8">
//                 <div className="w-full md:w-1/3">
//                   <legend className="tracking-wide text-sm">
//                     Postgraduate Institute
//                   </legend>
//                 </div>
//                 <div className="w-full md:w-2/3 mt-2 md:mt-0 md:px-3">
//                   <div className="mb-4">
//                     <label className={`${formStyles.formLable}`}>
//                       Postgraduate Institute Name
//                     </label>
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="text"
//                       name="name"
//                       placeholder="PGIS"
//                     />
//                   </div>
//                   <div className="flex flex-col md:flex-row mb-4">
//                     <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
//                       <label className={`${formStyles.formLable}`}>
//                         Registration No.
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="text"
//                         name="registration"
//                         placeholder="22222"
//                       />
//                     </div>
//                     <div className="w-full md:w-1/2">
//                       <label className={`${formStyles.formLable}`}>
//                         Students Identity Card No.
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="text"
//                         name="studentId"
//                         placeholder="22222"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col md:flex-row mb-4">
//                     <div className="w-full md:w-1/2 md:pr-3 mb-4 md:mb-0">
//                       <label className={`${formStyles.formLable}`}>
//                         Date of commencement of the course
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="date"
//                         name="commencement"
//                       />
//                     </div>
//                     <div className="w-full md:w-1/2">
//                       <label className={`${formStyles.formLable}`}>
//                         Date of completion of the course
//                       </label>
//                       <input
//                         className={`${formStyles.formTextInput}`}
//                         type="date"
//                         name="completion"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="py-5 flex flex-col md:flex-row">
//                 <div className="w-full md:w-1/3">
//                   <legend className="tracking-wide text-sm">Total Price</legend>
//                 </div>
//                 <div className="w-full mb-4">
//                   <input
//                     className={`${formStyles.formTextInput}`}
//                     type="text"
//                     name="name"
//                     placeholder="Auto filled"
//                   />
//                 </div>
//               </div>

//               <div className="py-4 flex flex-col md:flex-row mb-6">
//                 <div className="w-full md:w-1/3">
//                   <legend className="tracking-wide text-sm">Add Your Image</legend>
//                 </div>
//                 <div className="w-full md:w-2/3 text-center md:text-left">
//                   <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
//                     <input
//                       className={`${formStyles.formTextInput}`}
//                       type="file"
//                       name="addImage"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row mb-6 border-t border-b-0 border-l-0 border-r-0 border-cream-dark">
//                 <div className="w-full md:w-2/3 px-3 text-center md:text-right">
//                   <button
//                     type="submit"
//                     className="text-lg w-full md:w-1/3 shadow appearance-none rounded-xl py-3 px-3 font-bold bg-yellow-400 text-black hover:bg-yellow-500"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MemberPostG;
