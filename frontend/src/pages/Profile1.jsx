import { useState, useEffect } from "react";
import api from "../api";
import ProfileDataSection from "../components/Profile/ProfileInfoContainer";
import ProfileTable from "../components/Profile/ProfileTable";

function Profile1() {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileType, setProfileType] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const [showProfilesList, setShowProfilesList] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [isSelectedUser, setIsSelectedUser] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/user/profile/");
      if (response.data.status === "success") {
        const userData = response.data.data;
        const user_type = userData.profile.user_type;
        localStorage.setItem("userData", JSON.stringify(userData));

        setProfileType(user_type);
        setProfileData(userData);
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
        console.log(allProfiles);
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const handleShowAllProfilesClick = () => {
    fetchAllProfiles();
  };

  const handleHideAllProfilesClick = () => {
    setShowProfilesList(false);
    // window.location.reload();
  };

  const handleSpecificProfileClick = async (profileId) => {
    try {
      const response = await api.get(`/user/profile/${profileId}/`);
      if (response.data.status === "success") {
        const userData = response.data.data.user;
        setSelectedUserData(userData);
        setIsSelectedUser(true);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    } finally {
      setIsLoading(false);
    }
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
        {profileType === "admin" && !showProfilesList ? (
          <button
            onClick={handleShowAllProfilesClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
          >
            Show all Profiles
          </button>
        ) : profileType === "admin" && showProfilesList ? (
          <button
            onClick={handleHideAllProfilesClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
          >
            Hide all Profiles
          </button>
        ) : null}
      </div>

      <div className="mb-16">
        {isSelectedUser ? (
          <ProfileDataSection
            profileData={selectedUserData}
            profile_type={profileType}
            isSelectedUser={isSelectedUser}
          />
        ) : (
          <ProfileDataSection
            profileData={profileData}
            profile_type={profileType}
            isSelectedUser={isSelectedUser}
            fetchProfileData={fetchProfileData}
          />
        )}
      </div>
      <div>
        {showProfilesList && (
          <ProfileTable
            profiles={allProfiles}
            onProfileClick={handleSpecificProfileClick}
          />
        )}
      </div>
    </section>
  );
}

export default Profile1;
