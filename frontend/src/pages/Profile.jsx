import { useState, useEffect } from "react";
import api from "../api";

import ProfileDataContainer from "../components/Profile/ProfileDataContainer";

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

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <ProfileDataContainer
        userData={userData}
        profileData={profileData}
        setProfileData={setProfileData}
        setUserData={setUserData}
      />
    </div>
  );
};

export default Profile;
