import { useState } from 'react';
import CustomDatePicker from "../components/CustomDatePicker";
import Table from '../components/Table'; 
import EventCard from '../components/Event_Components/EventCard';
import ActiveCard from '../components/Event_Components/ActiveCard';
import DateCard from '../components/Event_Components/DateCard';

import sportEvent from '../assets/eventPage/SportsCard.jpg';
import musicalEvent from '../assets/eventPage/Musical.jpg';
import otherEvents from '../assets/eventPage/Other.jpg';
import cup from '../assets/eventPage/Card3.png';
import datebox1 from '../assets/eventPage/Card1.jpg';
import datebox2 from '../assets/eventPage/Card8.jpg';

const Events = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleReadMoreClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
    setSelectedCategory(null);
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="bg-gray-100 px-6 py-8">
      <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">Hello, Hasaranga Abeywickrama. 👋 </h1>

        {/* Active Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          <div className='transition transform hover:scale-105 hover:shadow-lg'>
            <ActiveCard title={"All Event"} img={cup}/>
          </div>
          <div className='transition transform hover:scale-105 hover:shadow-lg'>
            <ActiveCard title={"On going"} img={cup}/>
          </div>
          <div className='transition transform hover:scale-105 hover:shadow-lg'>
            <ActiveCard title={"Upcoming"} img={cup}/>
          </div>
        </div>

        {/* Event Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <div className='transition transform hover:scale-105 hover:shadow-lg'> 
            <EventCard title={"Sports"} img={sportEvent} handleReadMoreClick={handleReadMoreClick} categoryName={"Sport"}/>
          </div>
          <div className='transition transform hover:scale-105 hover:shadow-lg'>
            <EventCard title={"Musical Shows"} img={musicalEvent} handleReadMoreClick={handleReadMoreClick} categoryName={"Shows"}/>
          </div>
          <div className='transition transform hover:scale-105 hover:shadow-lg'>
            <EventCard title={"Other Functions"} img={otherEvents} handleReadMoreClick={handleReadMoreClick} categoryName={"Functions"}/>
          </div>
        </div>
      </div>

      {/* Date and Events Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-1 mb-4 px-2 sm:px-4">
        {!showDetails ? (
          <>
          {console.log(showDetails)}
            <div className="sm:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 mt-5 px-2 sm:px-4 md:px-7">
                <div className="text-lg sm:text-xl md:text-xl lg:text-xl">
                  <DateCard title={"On going Events"} events={"Football match, hockey match"} img={datebox1}/>
                </div>
                <div className="text-lg sm:text-xl md:text-xl lg:text-xl" >
                  <DateCard title={"Holidays"} events={"Navam Fullmoon poya day"} img={datebox2}/>
                </div>
              </div>
            </div>
            <div className="mt-4 px-2 sm:px-4">
                <div className="border border-gray-300 p-2 w-100 h-100 flex items-center justify-center bg-white mb-4 px-2 ">
                  <CustomDatePicker
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
            </div>
            <br />
          </>
        ) : (
          <div className="col-span-3 mt-8 px-10">
          <Table />
          <div className="flex justify-center mt-4">
            <button onClick={handleBackClick} className="bg-yellow-300 text-black  hover:bg-yellow-500 px-4 py-2 rounded w-full">
              Back
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
    
  );
};

export default Events;
