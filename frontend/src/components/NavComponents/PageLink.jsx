import { useContext } from "react";
import { LeftbarContext } from "./Leftbar";
import PropTypes from "prop-types";

const PageLink = ({ name, icon: Icon, href, isActive }) => {
  const { expanded } = useContext(LeftbarContext);

  return (
    <a
      href={href}
      className={`flex pl-4 py-3 hover:bg-secondary-golden transition-colors ${
        isActive ? "bg-secondary-golden-shade-1 text-info-dark-blue" : ""
      }`}
    >
      <li
        className={`relative flex items-center font-medium cursor-pointer  group`}
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
    </a>
  );
};

PageLink.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default PageLink;
