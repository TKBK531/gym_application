import { createContext, useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import pageLinks from "../../constants/index";
import PageLink from "./PageLink";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

export const LeftbarContext = createContext();

const Leftbar = ({ profileData }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setExpanded(true);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <aside
      className={`h-screen overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-16"
      }`}
    >
      <nav
        className={`h-full flex flex-col bg-white shadow-xl rounded-r-md overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 pb-2 flex items-center justify-between relative">
          <img
            src="https://img.logoipsum.com/254.svg"
            className={`transition-all duration-300 ease-in-out ${
              expanded
                ? "w-32 opacity-100 translate-x-0"
                : "w-0 opacity-0 -translate-x-full"
            }
            `}
            alt="Your Logo"
          />

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="group relative bg-secondary-golden  transition-all duration-200 ease-in-out ml-2 p-2 rounded-md focus:outline-none right-4 top-1/2 transform -translate-y-1/2"
          >
            {expanded ? (
              <ChevronLeft
                size={20}
                className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
              />
            ) : (
              <ChevronRight
                size={20}
                className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
              />
            )}

            <div className="absolute inset-0 bg-gray-100 rounded-md opacity-0 group-hover:opacity-25 transition-opacity duration-200"></div>
          </button>
        </div>

        <ul className="space-y-2 mt-4">
          <LeftbarContext.Provider value={{ expanded, setExpanded }}>
            {pageLinks.map((link) => (
              <PageLink
                key={link.index}
                href={link.href}
                icon={link.icon}
                name={link.name}
                isActive={activeLink === link.href}
              />
            ))}
          </LeftbarContext.Provider>
        </ul>

        <div className="relative py-3">
          <div
            className={`bottom-0 hover:bg-secondary-golden left-0 w-full border-t p-2 py-4 flex items-center justify-between transition-all duration-300 ease-in-out ${
              expanded ? "opacity-100 translate-y-0" : ""
            }`}
          >
            <div
              onClick={handleMenuToggle}
              className="flex w-full items-center cursor-pointer "
            >
              <img
                src="https://ui-avatars.com/api/?background=random"
                className={`w-8 h-8 rounded-full mr-3 ${!expanded && "mr-0"}`} // Conditional margin
                alt="Profile"
              />

              <div // Apply opacity transition only to the text
                className={`transition-opacity duration-300 ${
                  expanded ? "opacity-100" : "opacity-0"
                }`}
              >
                <h4
                  className={`font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded ? "w-32" : "w-0"
                  }`}
                >
                  Profile
                </h4>

                {/* Using profileData.email for consistency */}
              </div>
            </div>
          </div>
          {/* floating menu */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-90 top-16 w-max bg-white rounded-md shadow-lg z-10"
            >
              <div className="py-2 px-4">
                <p className="font-semibold text-sm">
                  {profileData.first_name} {profileData.last_name}
                </p>
                <p className="text-xs text-gray-500">{profileData.email}</p>
              </div>
              <hr className="border-t border-gray-200" />
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 text-sm text-info-dark-blue hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/logout")}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};
export default Leftbar;

Leftbar.propTypes = {
  profileData: PropTypes.object,
};
