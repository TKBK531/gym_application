import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => (
  <div>
    <h1>Hello Base Layout</h1>
    <Outlet />
    <h1>Right Bar</h1>
  </div>
);

export default BaseLayout;
