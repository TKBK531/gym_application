import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

const PageLink = ({ name, icon, href }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <div
      className={`pl-3 my-3 ${
        isActive
          ? "text-secondary-golden font-semibold"
          : "text-white font-light"
      }`}
    >
      <a href={href} className="flex">
        <div className="m-1">
          <FontAwesomeIcon icon={icon} className="h-4 w-4 mr-2" />
        </div>
        <div className="mr-auto m-1">
          <p>{name}</p>
        </div>
      </a>
    </div>
  );
};

export default PageLink;
