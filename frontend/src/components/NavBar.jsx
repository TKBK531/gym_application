import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ onHamburgerClick }) => {
  const location = useLocation();

  const getNavPath = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
      return (
        <NavLink to="/" className="text-black hover:underline">
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
        {/* Hamburger Menu Icon */}
        <button className="block md:hidden mr-4" onClick={onHamburgerClick}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        {/* Optional logo or brand name here */}
        <div className="ml-auto">{getNavPath(location.pathname)}</div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  onHamburgerClick: PropTypes.func.isRequired,
};

export default NavBar;
