import React from 'react';

const DateCard = ({title, img}) => {

  const ongoingEvents = "football match, hockey match";

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex items-center space-x-4 max-w-md">
      <img
        src={img}
        alt="Clipboard Icon"
        className="w-12 h-12"
      />
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-500">{ongoingEvents}</p>
      </div>
    </div>
  );
};

export default DateCard;
