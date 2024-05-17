import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

const PageLink = ({ name, icon, href }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <div
      className={`pl-3 py-3 transition-all duration-500 ease-in-out hover:text-info-dark-blue hover:bg-secondary-golden hover:font-medium ${
        isActive ? "text-secondary-golden font-medium" : "text-white font-light"
      }`}
    >
      <a href={href} className="flex">
        <div className="m-1">
          <FontAwesomeIcon icon={icon} className="h-4 w-4 mr-2" />
        </div>
        <div className="mr-auto m-1">
          <p>{name}</p>
        </div>
        {/* <div>
          <p className={`font-black ${isActive ? "" : "hidden"}`}>|</p>
        </div> */}
      </a>
    </div>
  );
};

export default PageLink;
