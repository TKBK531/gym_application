import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

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
      </a>
    </div>
  );
};

PageLink.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
};

export default PageLink;
