import { Outlet } from "react-router-dom";
// import LeftBar from "../components/LeftBar";
import NavBar from "../components/NavBar";
import { useState } from "react";
import Leftbar from "../components/NavComponents/Leftbar";
import ScrollToTopButton from "../components/Buttons/ScrollToTopButton";

const BaseLayout = () => {
  const [userProfileData, setUserProfileData] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));

  useState(() => {
    setUserProfileData(userData);
  }, [userData]);

  return (
    <div className="grid h-screen grid-cols-[auto,1fr]">
      <div className="bg-gray-200 top-0 h-screen overflow-y-auto">
        <Leftbar profileData={userProfileData} />
      </div>
      <div className="flex flex-col">
        <div className="w-full bg-gray-200 z-0">
          <NavBar />
        </div>
        <div className="bg-slate-100 flex flex-col py-14 px-7">
          <Outlet />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default BaseLayout;
