import React, { useState } from "react";

const MemberOutside = () => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const [familyDetails, setFamilyDetails] = useState([
    { name: "", age: "", relation: "", occupation: "" },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...familyDetails];
    values[index][event.target.name] = event.target.value;
    setFamilyDetails(values);
  };

  const handleAddMember = () => {
    setFamilyDetails([
      ...familyDetails,
      { name: "", age: "", relation: "", occupation: "" },
    ]);
  };

  const handleRemoveMember = (index) => {
    const values = [...familyDetails];
    values.splice(index, 1);
    setFamilyDetails(values);
  };

  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              Non University Category
            </h2>
          </div>
          <form>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Personal</legend>
                <p className="text-xs font-light text-red">
                  This entire section is required.
                </p>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className="block tracking-wide text-xs font-bold">
                    Name(Mr./Ms.)
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="name"
                    placeholder="Acme Mfg. Co."
                  />
                </div>
                <div className="mb-4">
                  <label className="block tracking-wide text-xs font-bold">
                    National Identity Card No.
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="name"
                    placeholder="Acme Mfg. Co."
                  />
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Date of Birth
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="date"
                      name="appointment"
                      placeholder="2000/01/01"
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Age
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="tempory"
                      placeholder="1 year"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block tracking-wide text-xs font-bold">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                    <label className="block tracking-wide text-xs font-bold">
                      Mobile
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="tel"
                      name="mobile"
                      placeholder="0771122333"
                    />
                  </div>
                  <div className="md:flex-1 md:pr-3">
                    <label className="block tracking-wide text-xs font-bold">
                      Office
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="tel"
                      name="office"
                      placeholder="0912233444"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                    Address
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="address"
                    placeholder="425 Galaha Lane, Peradeniya"
                  />
                </div>
                <div className="mb-4">
                  <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                    Email
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="email"
                    name="email"
                    placeholder="contact@acme.co"
                  />
                </div>
              </div>
            </div>

            {category !== "individual" && (
              <div>
                <h2 className="py-3 tracking-wide text-sm">Family Details</h2>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className=" tracking-wide text-charcoal-darker text-xs font-bold">
                        Name
                      </th>
                      <th className=" tracking-wide text-charcoal-darker text-xs font-bold">
                        Age
                      </th>
                      <th className=" tracking-wide text-charcoal-darker text-xs font-bold">
                        Relationship
                      </th>
                      <th className=" tracking-wide text-charcoal-darker text-xs font-bold">
                        NIC No.
                      </th>
                      <th className=" tracking-wide text-charcoal-darker text-xs font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {familyDetails.map((member, index) => (
                      <tr key={index}>
                        <td className="shadow-inner p-4 border-0">
                          <input
                            type="text"
                            name="name"
                            value={member.name}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder="Name"
                          />
                        </td>
                        <td className="shadow-inner p-4 border-0">
                          <input
                            type="number"
                            name="age"
                            value={member.age}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder="Age"
                          />
                        </td>
                        <td className="shadow-inner p-4 border-0">
                          <select
                            name="relation"
                            value={member.relation}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          >
                            <option value="">Select Relation</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Husband">Husband</option>
                            <option value="Wife">Wife</option>
                            <option value="Child">Child</option>
                          </select>
                        </td>
                        <td className="shadow-inner p-4 border-0">
                          <input
                            type="text"
                            name="nic"
                            value={member.nic}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder="NIC Number"
                          />
                        </td>
                        <td className="shadow-inner p-4 border-0">
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Member
                </button>
              </div>
            )}

            <div className="py-5 md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">Total Price</legend>
              </div>
              <div className="mb-4">
                <input
                  className="w-full shadow-inner p-4 border-0"
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
