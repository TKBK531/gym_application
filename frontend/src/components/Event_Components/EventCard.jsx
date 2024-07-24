import React from 'react';

const EventCard = ({title, img}) => {
  return (
    <div className="border rounded-lg overflow-hidden max-w-sm shadow-lg hover:shadow-lg h-full">
      <img
        src={img}
        alt="Sports"
        className="w-full"
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <a href="#more" className="text-blue-500 hover:underline">Read More</a>
      </div>
    </div>
  );
};

export default EventCard;
