import React from 'react';

const DateCard = ({title, img, events}) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex items-center space-x-4 max-w-sm hover:shadow-lg">
      <img
        src={img}
        alt="Trophy and Soccer Ball"
        className="w-12 h-12"
      />
      <div>
        <p className="text-md sm:text-lg md:text-xl">{title}</p>
        <p className="text-gray-500 text-md sm:text-lg md:text-xl">{events}</p>
      </div>
    </div>
  );
};

export default DateCard;
