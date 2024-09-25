const InfoCard = ({ title, value, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <p className="text-3xl font-semibold mb-4">{value}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default InfoCard;
