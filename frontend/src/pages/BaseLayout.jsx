import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import NavBar from "./RightBar";

const BaseLayout = () => (
  <div className="flex flex-row">
    <div className="hidden xs:block w-[290px]  bg-gray-200">
      <LeftBar />
    </div>
    <div className="flex flex-col w-full sm:w-3/4">
      <div className="w-full bg-gray-200">
        <NavBar />
      </div>
      <div className="w-full bg-gray-300">
        <Outlet />
      </div>
    </div>
  </div>
);

export default BaseLayout;
