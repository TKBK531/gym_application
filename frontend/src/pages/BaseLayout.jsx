import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import NavBar from "../components/NavBar";

const BaseLayout = () => {
  const userProfileData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="flex h-screen">
      <div className="hidden xs:block w-[290px] bg-gray-200">
        <LeftBar profileData={userProfileData} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-gray-200">
          <NavBar />
        </div>
        <div className="flex-1 bg-gray-300 pt-12 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
