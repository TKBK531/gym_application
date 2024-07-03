import PropTypes from "prop-types";

const SportCard = ({ sport, onClick, className }) => {
  const defaultImageUrl =
    "http://127.0.0.1:8000/media/images/sport_images/baseball.webp";
  const imageUrl = sport.image || defaultImageUrl;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col w-full max-w-sm transition-all rounded-lg overflow-hidden shadow-xl bg-white m-4 duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
      style={{
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
      }} // Added inline style
    >
      {/* Added group and perspective for better transitions */}
      <div className="group relative w-full h-56 perspective-1000">
        <img
          src={imageUrl}
          alt={sport.label}
          className="object-cover object-center w-full h-full transform transition duration-500 ease-out"
        />
        {/* Added a subtle overlay effect on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-500 ease-out"></div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 transition duration-300 hover:text-blue-500">
          {sport.label}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {sport.in_charge_name
            ? `In charge: ${sport.in_charge_name}`
            : "No in charge assigned yet"}
        </p>
        <button className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 hover:scale-105">
          Learn More
        </button>
      </div>
    </div>
  );
};

SportCard.propTypes = {
  sport: PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string,
    in_charge_name: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SportCard;
