import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageLink = ({ name, icon, href }) => (
  <div className="pl-3 bg-purple-300 my-3">
    <a href={href} className="flex">
      <div className="m-1">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="mr-auto m-1">
        <p>{name}</p>
      </div>
      <div className="m-1 mr-0">
        <p>|</p>
      </div>
    </a>
  </div>
);

export default PageLink;
