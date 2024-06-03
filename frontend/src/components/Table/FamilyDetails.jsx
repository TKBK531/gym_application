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
      <h2 className="py-3 tracking-wide text-sm">Family Details</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className=" tracking-wide text-sub font-normal">Name</th>
            <th className=" tracking-wide text-sub font-normal">Age</th>
            <th className=" tracking-wide text-sub font-normal">
              Relationship
            </th>
            <th className=" tracking-wide text-sub font-normal">NIC No.</th>
            <th className=" tracking-wide text-sub font-normal">Actions</th>
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
                  onChange={(event) => handleInputChange(index, event)}
                  className={`${formStyles.formTextInput}`}
                  placeholder="Name"
                />
              </td>
              <td className="shadow-inner p-4 border-0">
                <input
                  type="number"
                  name="age"
                  value={member.age}
                  onChange={(event) => handleInputChange(index, event)}
                  className={`${formStyles.formTextInput}`}
                  placeholder="Age"
                />
              </td>
              <td className="shadow-inner p-4 border-0">
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
              <td className="shadow-inner p-4 border-0">
                <input
                  type="text"
                  name="nic"
                  value={member.nic}
                  onChange={(event) => handleInputChange(index, event)}
                  className={`${formStyles.formTextInput}`}
                  placeholder="NIC Number"
                />
              </td>
              <td className="shadow-inner p-4 border-0">
                <button
                  type="button"
                  onClick={() => handleRemoveMember(index)}
                  className="px-2 py-1 bg-red-300 text-white rounded hover:bg-red-400"
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
        className="mt-4 px-2 py-1 bg-blue-300 text-white rounded hover:bg-blue-400"
      >
        Add Member
      </button>
    </div>
  );
};

export default FamilyDetails;
