import { useContext } from "react";
import { LeftbarContext } from "./Leftbar";
import PropTypes from "prop-types";

const PageLink = ({ name, icon: Icon, href, isActive }) => {
  const { expanded } = useContext(LeftbarContext);

  return (
    <li
      className={`relative flex items-center py-3 pl-3 my-3 font-medium cursor-pointer transition-colors hover:bg-secondary-golden group ${
        isActive ? "bg-secondary-golden-shade-1 text-info-dark-blue" : ""
      }
      
      `}
    >
      <a href={href} className="flex">
        <Icon size={25} className="mr-4" />
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-36 ml-3" : "w-0 ml-0"
          }`}
        >
          {name}
        </span>
      </a>
    </li>
  );
};

PageLink.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default PageLink;
