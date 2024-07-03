import { useContext } from "react";
import { LeftbarContext } from "./Leftbar";
import PropTypes from "prop-types";

const PageLink = ({ name, icon: Icon, onClick, isActive }) => {
  const { expanded } = useContext(LeftbarContext);

  return (
    <li
      onClick={onClick}
      className={`relative flex items-center font-medium pl-4 py-3 hover:bg-secondary-golden transition-colors cursor-pointer ${
        isActive ? "bg-secondary-golden-shade-1 text-info-dark-blue" : ""
      }`}
    >
      <Icon size={25} className="mr-4" />
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-36 ml-3" : "w-0 ml-0"
        }`}
      >
        {name}
      </span>
    </li>
  );
};

PageLink.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PageLink;
