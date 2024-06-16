import { useState } from "react";
import { userTypes } from "../../constants/index";
import { profileTableStyles } from "../../styles";
import PropTypes from "prop-types";

const ProfileTable = ({ profiles, onProfileClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesEmail = profile.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesUserType = selectedUserType
      ? profile.user_type === parseInt(selectedUserType, 10)
      : true;
    return matchesEmail && matchesUserType;
  });

  return (
    <div className="mt-8 overflow-x-auto">
      <h3 className="text-xl font-medium py-7">All User Information</h3>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
        <select
          value={selectedUserType}
          onChange={handleUserTypeChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All User Types</option>
          {userTypes.map((type) => (
            <option key={type.pk} value={type.pk}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead>
          <tr>
            <th scope="col" className={`${profileTableStyles.tableHeader}`}>
              Name
            </th>
            <th scope="col" className={`${profileTableStyles.tableHeader}`}>
              Email
            </th>
            <th scope="col" className={`${profileTableStyles.tableHeader}`}>
              Contact
            </th>
            <th scope="col" className={`${profileTableStyles.tableHeader}`}>
              National ID
            </th>
            <th scope="col" className={`${profileTableStyles.tableHeader}`}>
              User Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProfiles.map((profile) => (
            <tr
              key={profile.id}
              className="cursor-pointer hover:bg-gray-200 transition-colors duration-300"
              onClick={() => onProfileClick(profile.id)}
            >
              <td className={`${profileTableStyles.tableData}`}>
                {profile.first_name} {profile.last_name}
              </td>
              <td className={`${profileTableStyles.tableData}`}>
                {profile.email}
              </td>
              <td className={`${profileTableStyles.tableData}`}>
                {profile.contact}
              </td>
              <td className={`${profileTableStyles.tableData}`}>
                {profile.national_id}
              </td>
              <td className={`${profileTableStyles.tableData}`}>
                {userTypes.find((type) => type.pk === profile.user_type)
                  ?.label || "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProfileTable.propTypes = {
  profiles: PropTypes.array.isRequired,
  onProfileClick: PropTypes.func.isRequired,
};

export default ProfileTable;
