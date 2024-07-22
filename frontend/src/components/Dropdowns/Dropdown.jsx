import PropTypes from "prop-types";

const Dropdown = ({ options }) => {
  return (
    <div className="w-64">
      <select
        id="role-dropdown"
        onChange={(e) => console.log(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="SELECT ONE" defaultValue>
          SELECT ONE
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
};

export default Dropdown;
