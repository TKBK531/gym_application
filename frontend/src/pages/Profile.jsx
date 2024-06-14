import { useState, useEffect } from "react";
import api from "../api";
import ProfileDataSection from "../components/Profile/ProfileInfoContainer";
import { userTypes } from "../constants/index";
import { profileTableStyles } from "../styles";
import ProfileTable from "../components/Profile/ProfileTable";

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

      <ProfileDataSection
        profileData={profileData}
        profile_type={profileType}
        fetchProfileData={fetchProfileData}
      />

      {showProfilesList && <ProfileTable profiles={allProfiles} />}
    </section>
  );
}

export default Profile;
