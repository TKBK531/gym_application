import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Leftbar from "../NavComponents/Leftbar";
import ScrollToTopButton from "../Buttons/ScrollToTopButton";

const BaseLayout = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLeftbarVisible, setIsLeftbarVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleHamburgerClick = () => {
    setExpanded(true);
    setIsLeftbarVisible(!isLeftbarVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full bg-gray-200">
        <NavBar
          onHamburgerClick={handleHamburgerClick}
          isLeftbarVisible={isLeftbarVisible}
        />
      </div>
      <div className="flex flex-1 overflow-hidden w-full">
        <Leftbar
          userData={userData}
          isLeftbarVisible={isLeftbarVisible}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <div className="flex-1 bg-slate-100 flex flex-col py-14 px-7 overflow-auto">
          <Outlet />
          <ScrollToTopButton />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
