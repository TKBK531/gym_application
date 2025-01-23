import PropTypes from "prop-types";

const Card = ({ imageUrl, title }) => {
  return (
    <div className="w-64 h-72 bg-white rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      {/* Overlay Title */}
      <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-lg shadow-sm">
        <span className="text-gray-700 font-medium text-sm">{title}</span>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
