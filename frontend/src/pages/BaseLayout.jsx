import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

const BaseLayout = () => (
  <div className="flex">
    <div className="w-1/4 bg-gray-200">
      <LeftBar />
    </div>
    <div className="w-1/2 bg-gray-300">
      <Outlet />
    </div>
    <div className="w-1/4 bg-gray-200">
      <RightBar />
    </div>
  </div>
);

export default BaseLayout;
