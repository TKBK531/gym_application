import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => (
  <div className="flex">
    <div className="w-1/4 bg-gray-200">
      <h1>Left Bar</h1>
    </div>
    <div className="w-1/2 bg-gray-300">
      <Outlet />
    </div>
    <div className="w-1/4 bg-gray-200">
      <h1>Right Bar</h1>
    </div>
  </div>
);

export default BaseLayout;
