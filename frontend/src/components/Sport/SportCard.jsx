import PropTypes from "prop-types";

const SportCard = ({ sport }) => {
  const defaultImageUrl = "https://shorturl.at/fpPBH";
  const imageUrl = sport.image || defaultImageUrl;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={imageUrl} alt={sport.label} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{sport.label}</div>
        <p className="text-gray-700 text-base">
          {sport.in_charge_name
            ? `In charge: ${sport.in_charge_name}`
            : "No in charge assigned"}
        </p>
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
};

export default SportCard;
