import React from 'react';

const ActiveCard = ({title, img}) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex items-center space-x-4 max-w-sm hover:shadow-lg">
      <img
        src={img}
        alt="Trophy and Soccer Ball"
        className="w-12 h-12"
      />
      <div>
        <p className="text-md sm:text-lg md:text-xl font-semibold">0</p>
        <p className="text-gray-500 text-md sm:text-lg md:text-xl">{title}</p>
      </div>
    </div>
  );
};

export default ActiveCard;
