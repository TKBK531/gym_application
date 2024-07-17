import { useState, useEffect } from "react";
import api from "../api";

import ProfileDataContainer from "../components/Profile/ProfileDataContainer";
import ProfileTable from "../components/Profile/ProfileTable";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    date_of_birth: "",
    city: "",
    contact: "",
    id: null,
    national_id: "",
    profile_picture: "",
    province: "",
    user_type: "",
  });
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/user/profile/");
        setProfileData(response.data.data.profile);
        setUserData(response.data.data.user);
        console.log("Profile data:", profileData);
        console.log("User data:", userData);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllProfiles = async () => {
    try {
      const response = await api.get("/user/profile/all-profiles/");
      setAllProfiles(response.data.data);
      console.log(allProfiles);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  const onProfileClick = (profileID) => {
    console.log("Profile Clicked: ", profileID);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {profileData.user_type === "admin" && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchAllProfiles}
        >
          Get All Profiles
        </button>
      )}

      <ProfileDataContainer
        userData={userData}
        profileData={profileData}
        setProfileData={setProfileData}
        setUserData={setUserData}
      />
      <section id="all-profiles">
        {" "}
        {Object.keys(allProfiles).length > 0 && (
          <ProfileTable
            profiles={allProfiles}
            onProfileClick={onProfileClick}
          />
        )}
      </section>
    </div>
  );
};

export default Profile;
