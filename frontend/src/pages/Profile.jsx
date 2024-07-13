import { useState, useEffect } from "react";
import api from "../api";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/user/profile/");
      setProfileData(response.data.data);
      console.log(profileData);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  return (
    <div>
      <div>Profile</div>
    </div>
  );
};

export default Profile;
