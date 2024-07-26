import React, { useState } from 'react';
import CountingCard from "../components/CountingCard";
import { countingCards, categoryCards } from "../constants/index";
import CustomDatePicker from "../components/CustomDatePicker";
import { dateBox } from "../constants/index";
import DateBox from "../components/DateBox";
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
      <div>
        <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">Hello Alesia K. 👋 </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mt-10 px-4">
          <div className='transition transform hover:scale-105'>
            <ActiveCard title={"All Event"} img={cup}/>
          </div>
          <div className='transition transform hover:scale-105'>
            <ActiveCard title={"On going"} img={cup}/>
          </div>
          <div className='transition transform hover:scale-105'>
            <ActiveCard title={"Upcoming"} img={cup}/>
          </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xs:grid-cols-1 gap-6 mt-8 px-2 sm:px-4 md:px-10">
          <div className='transition transform hover:scale-105'> 
            <EventCard title={"Sports"} img={sportEvent} handleReadMoreClick={handleReadMoreClick} categoryName={"Sport"}/>
          </div>
          <div className='transition transform hover:scale-105'>
            <EventCard title={"Musical Shows"} img={musicalEvent} handleReadMoreClick={handleReadMoreClick} categoryName={"Shows"}/>
          </div>
          <div className='transition transform hover:scale-105'>
            <EventCard title={"Other Funtions"} img={otherEvents} handleReadMoreClick={handleReadMoreClick} categoryName={"Functions"}/>
          </div>
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-1 mb-4 px-2 sm:px-4">
        {!showDetails ? (
          <>
          {console.log(showDetails)}
            <div className="sm:col-span-2">
              <div className="grid grid-cols-2 gap-5 mt-5 px-2 sm:px-4 md:px-7">
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
            <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
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
