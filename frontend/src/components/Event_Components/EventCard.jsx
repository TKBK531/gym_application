import React from 'react';

const EventCard = ({title, img, handleReadMoreClick, categoryName}) => {
  return (
    <div className="border rounded-lg overflow-hidden max-w-sm shadow-lg hover:shadow-lg h-full">
      <img
        src={img}
        alt="Event"
        className="w-full"
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <button onClick={() => handleReadMoreClick(categoryName)} className="text-blue-500 hover:underline">Read More</button>
      </div>
    </div>
  );
};

export default EventCard;
