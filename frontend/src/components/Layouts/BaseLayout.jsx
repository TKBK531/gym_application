import { useState } from "react";
import { Outlet } from "react-router-dom";
import Leftbar from "../NavComponents/Leftbar";
import NavBar from "../NavBar";

const BaseLayout = () => {
  const [userProfileData, setUserProfileData] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  useState(() => {
    setUserProfileData(userData);
  }, [userData]);
  return (
    <div className="flex h-screen">
      <div className="hidden xs:block w-[290px] bg-gray-200 z-30">
        <LeftBar profileData={userProfileData} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-gray-200">
          <NavBar />
        </div>
        <div className="bg-slate-100 flex py-14 px-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
