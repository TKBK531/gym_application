import { useState, useEffect } from "react";
import api from "../api";
import ProfileDataSection from "../components/Profile/ProfileInfoContainer";
import { userTypes } from "../constants/index";

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileType, setProfileType] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const [showProfilesList, setShowProfilesList] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // Initial sorting by name
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/user/profile/");
      if (response.data.status === "success") {
        const userData = response.data.data.user;
        localStorage.setItem("userData", JSON.stringify(userData));

        const { user_type, ...restOfUserData } = userData;
        setProfileType(user_type);
        setProfileData(restOfUserData);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllProfiles = async () => {
    try {
      const response = await api.get("/user/profile/all-profiles/");
      if (response.data.status === "success") {
        console.log("All profiles fetched successfully");
        setAllProfiles(response.data.data);
        setShowProfilesList(true);
        // console.log(allProfiles);
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const handleShowAllProfilesClick = () => {
    fetchAllProfiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-row">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left mr-auto">
          Profile{" "}
        </h2>
        {profileType === "admin" ? (
          <button
            onClick={handleShowAllProfilesClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
          >
            Show all Profiles
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex justify-left py-5">
        <div className="flex justify-center items-center">
          <img
            src={
              profileData.profile_picture ||
              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="ml-10 gap-2 py-5">
          <h3 className="text-xl font-normal">
            {profileData.first_name} {profileData.last_name}
          </h3>
          <p className="text-gray-400 capitalize">{profileType} user</p>
        </div>
      </div>

      <ProfileDataSection
        profileData={profileData}
        profile_type={profileType}
        fetchProfileData={fetchProfileData}
      />

      {showProfilesList && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            {" "}
            {/* Use table-auto for better column sizing */}
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  National ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allProfiles.map((profile) => (
                <tr
                  key={profile.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleShowAllProfilesClick(profile.id)}
                >
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    {profile.first_name} {profile.last_name}
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    {profile.email}
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    {profile.contact}
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    {profile.national_id}
                  </td>
                  <td className="px-6 py-4 text-[13px] whitespace-nowrap">
                    {userTypes.find((type) => type.pk === profile.user_type)
                      ?.label || "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Profile;
