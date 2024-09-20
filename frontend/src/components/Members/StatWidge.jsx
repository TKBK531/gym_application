import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const StatWidge = ({ name, count, iconName }) => {
  return (
    <div className="w-full lg:w-1/4 p-2">
      <div className="widget w-full p-4 rounded-lg bg-white border-l-4 border-yellow-400">
        <div className="flex items-center">
          <div className="icon w-14 p-3.5 bg-yellow-200 text-white rounded-full mr-3">
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={iconName}
                className="text-blue-500"
                size="2x"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-lg font-semibold">{count}</div>
            <div className="text-sm text-gray-500">{name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatWidge.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default StatWidge;

