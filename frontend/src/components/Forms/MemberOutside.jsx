import React, { useState } from "react";
import { formStyles } from "../../styles";
import FamilyDetails from "../Table/FamilyDetails";

const MemberOutside = () => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              Non University Form
            </h2>
          </div>
          <form>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Personal</legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    Name(Mr./Ms.)
                  </label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="name"
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
                    name="name"
                    placeholder="Acme Mfg. Co."
                  />
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>
                      Date of Birth
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="date"
                      name="appointment"
                      placeholder="2000/01/01"
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className={`${formStyles.formLable}`}>
                      Age
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="text"
                      name="tempory"
                      placeholder="1 year"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={handleCategoryChange}
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

            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Contact</legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className={`${formStyles.formLable}`}>
                      Mobile
                    </label>
                    <input
                      className={`${formStyles.formTextInput}`}
                      type="tel"
                      name="mobile"
                      placeholder="0771122333"
                    />
                  </div>
                  <div className="md:flex-1 md:pr-3">
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
                  <label className={`${formStyles.formLable}`}>
                    Address
                  </label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="text"
                    name="address"
                    placeholder="425 Galaha Lane, Peradeniya"
                  />
                </div>
                <div className="mb-4">
                  <label className={`${formStyles.formLable}`}>
                    Email
                  </label>
                  <input
                    className={`${formStyles.formTextInput}`}
                    type="email"
                    name="email"
                    placeholder="contact@acme.co"
                  />
                </div>
              </div>
            </div>

            {category !== "individual" && (
              <FamilyDetails />
            )}

            <div className="py-5 md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Total Price</legend>
              </div>
              <div className="mb-4">
                <input
                  className={`${formStyles.formTextInput}`}
                  type="text"
                  name="name"
                  placeholder="Auto filled"
                />
              </div>
            </div>

            <div className="py-4 md:flex mb-6">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Cover Image</legend>
              </div>
              <div className="md:flex-1 px-3 text-center">
                <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                  <input
                    className="opacity-0 absolute pin-x pin-y"
                    type="file"
                    name="cover_image"
                  />
                  Add Your Image
                </div>
              </div>
            </div>

            <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right">
                <input type="hidden" name="sponsor" value="0" />
                <input
                  className="button text-cream-lighter bg-brick hover:bg-brick-dark"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MemberOutside;
