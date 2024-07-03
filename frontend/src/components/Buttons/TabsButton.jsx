import PropTypes from "prop-types";

const TabsButton = ({ text, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`text-info-dark-blue border border-info-dark-blue hover:bg-info-dark-blue hover:text-white transition-all duration-200 mr-1 my-2 px-2 py-2 rounded-t-md ${
        isActive ? "bg-info-dark-blue text-white" : ""
      }`}
    >
      {text}
    </button>
  );
};

TabsButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default TabsButton;
