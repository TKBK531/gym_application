import React, { useState } from "react";
import { formStyles } from "../../styles";

const FamilyDetails = () => {
  const [familyDetails, setFamilyDetails] = useState([
    { name: "", age: "", relation: "", nic: "" },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...familyDetails];
    values[index][event.target.name] = event.target.value;
    setFamilyDetails(values);
  };

  const handleAddMember = () => {
    setFamilyDetails([
      ...familyDetails,
      { name: "", age: "", relation: "", nic: "" },
    ]);
  };

  const handleRemoveMember = (index) => {
    const values = [...familyDetails];
    values.splice(index, 1);
    setFamilyDetails(values);
  };

  return (
    <div>
      <h2 className="py-3 tracking-wide text-lg md:text-xl">Family Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left tracking-wide text-sm md:text-md font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left tracking-wide text-sm md:text-md font-medium text-gray-700">
                Age
              </th>
              <th className="px-4 py-2 text-left tracking-wide text-sm md:text-md font-medium text-gray-700">
                Relationship
              </th>
              <th className="px-4 py-2 text-left tracking-wide text-sm md:text-md font-medium text-gray-700">
                NIC No.
              </th>
              <th className="px-4 py-2 text-left tracking-wide text-sm md:text-md font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {familyDetails.map((member, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={member.name}
                    onChange={(event) => handleInputChange(index, event)}
                    className={`${formStyles.formTextInput}`}
                    placeholder="Name"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    name="age"
                    value={member.age}
                    onChange={(event) => handleInputChange(index, event)}
                    className={`${formStyles.formTextInput}`}
                    placeholder="Age"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    name="relation"
                    value={member.relation}
                    onChange={(event) => handleInputChange(index, event)}
                    className={`${formStyles.formTextInput}`}
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
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="nic"
                    value={member.nic}
                    onChange={(event) => handleInputChange(index, event)}
                    className={`${formStyles.formTextInput}`}
                    placeholder="NIC Number"
                  />
                </td>
                <td className="px-4 py-2">
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
      </div>
      <button
        type="button"
        onClick={handleAddMember}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Member
      </button>
    </div>
  );
};

export default FamilyDetails;
