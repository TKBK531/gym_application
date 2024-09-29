import { useState, useEffect, useRef } from "react";
import api from "../api";

import ProfileDataContainer from "../components/Profile/ProfileDataContainer";
import ProfileTable from "../components/Profile/ProfileTable";
import FinilizeProfile from "../components/Popups/FinilizeProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
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
  const [showFinilizePopup, setShowFinilizePopup] = useState(false);
  const [allProfiles, setAllProfiles] = useState([]);
  const [userTypeData, setUserTypeData] = useState({});
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/user/profile/");
        setProfileData(response.data.data.profile);
        setUserData(response.data.data.user);
        setUserTypeData(response.data.data.user_type_data);
        console.log("Profile data:", profileData);
        console.log("User data:", userData);
        console.log("User type data:", userTypeData);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the popup is open and the click is outside the popup, then close it
      if (
        showFinilizePopup &&
        popupRef.current &&
        !popupRef.current.contains(e.target)
      ) {
        setShowFinilizePopup(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showFinilizePopup]);

  const fetchAllProfiles = async () => {
    navigate("/profile/all-profiles");
  };

  const onProfileClick = (profileID) => {
    console.log("Profile Clicked: ", profileID);
  };

  const onFinilizeProfileClick = () => {
    console.log("Finilize Profile Clicked");
    setShowFinilizePopup(true);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      {profileData.user_type === "admin" && (
        <button
          className="bg-secondary-golden-shade-1 hover:bg-secondary-golden py-2 px-4 rounded transition ease-in-out duration-300"
          onClick={fetchAllProfiles}
        >
          Get All Profiles
        </button>
      )}
      {profileData.user_type === "internal" && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onFinilizeProfileClick}
        >
          Finilize my Profile
        </button>
      )}

      <ProfileDataContainer
        userData={userData}
        profileData={profileData}
        userTypeData={userTypeData}
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
      {showFinilizePopup && (
        <FinilizeProfile
          closePopup={() => setShowFinilizePopup(false)}
          profileData={profileData}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Profile;
