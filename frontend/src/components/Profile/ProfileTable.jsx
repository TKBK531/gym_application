import { userTypes } from "../../constants/index";
import { profileTableStyles } from "../../styles";
import PropTypes from "prop-types";

const ProfileTable = ({ profiles }) => {
  return (
    <div className="mt-8 overflow-x-auto">
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
          {profiles.map((profile) => (
            <tr
              key={profile.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => console.log(`Profile ID: ${profile.id}`)}
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
};

export default ProfileTable;
