import React from "react";
import { useLocation, NavLink } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const getNavPath = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
      return (
        <NavLink to="/" className="text-white hover:underline">
          Home
        </NavLink>
      );
    }

    return parts.map((part, index) => (
      <React.Fragment key={part}>
        {index > 0 && (
          <span className="text-black mx-1">&gt;</span> // Arrow separator
        )}
        <NavLink
          to={`/${parts.slice(0, index + 1).join("/")}`}
          className={({ isActive }) =>
            `text-inf hover:underline ${isActive ? "font-bold" : ""}`
          } // Highlight the active link
        >
          {part.charAt(0).toUpperCase() + part.slice(1)}
        </NavLink>
      </React.Fragment>
    ));
  };

  return (
    <nav className="bg-white p-4 sticky top-0">
      <div className="container mx-auto flex items-center">
        {/* Optional logo or brand name here */}
        <div className="ml-auto">{getNavPath(location.pathname)}</div>
      </div>
    </nav>
  );
};

export default NavBar;
