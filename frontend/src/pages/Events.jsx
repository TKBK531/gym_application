import React, { useState } from 'react';
import CountingCard from "../components/CountingCard";
import { countingCards, categoryCards } from "../constants/index";
import MediaCard from "../components/CategoryCard";  // Ensure correct import
import CustomDatePicker from "../components/CustomDatePicker";
import { dateBox } from "../constants/index";
import DateBox from "../components/DateBox";
import Table from '../components/Table'; 

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-4">
          {countingCards.map((card) => (
            <div  key={card.id} className="transition transform hover:scale-105 hover:shadow-lg">
              <CountingCard count={card.count} test={card.test} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-2 sm:px-4 md:px-10">
          {categoryCards.map((card) => (
            <div key={card.id} className="transition transform hover:scale-105 hover:shadow-lg">
              <MediaCard
                categoryName={card.categoryName}
                image={card.image}
                onReadMoreClick={() => handleReadMoreClick(card.categoryName)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-1 mb-4 px-2 sm:px-4">
        {!showDetails ? (
          <>
            <div className="sm:col-span-2">
              <div className="grid grid-cols-1 gap-5 mt-5 px-2 sm:px-4 md:px-7">
                {dateBox.map((card) => (
                  <div key={card.id} className="transition transform hover:scale-105 hover:shadow-lg">
                  <DateBox
                    count={card.count}
                    test={card.test}
                    image={card.image}
                  />
                </div>
                ))}
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
          <div className="flex justify-center mt-4 bg-red-500">
            <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded">
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
