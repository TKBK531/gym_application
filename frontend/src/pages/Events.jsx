import React, { useState } from 'react';
import CountingCard from "../components/CountingCard";
import { countingCards, categoryCards } from "../constants/index";
import MediaCard from "../components/CategoryCard";  // Ensure correct import
import CustomDatePicker from "../components/CustomDatePicker";
import { dateBox } from "../constants/index";
import DateBox from "../components/DateBox";

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
        <h1>Hello Alesia K. 👋 </h1>
        <div className="grid grid-cols-3 gap-4 mt-10 px-4">
          {countingCards.map((card) => (
            <CountingCard key={card.id} count={card.count} test={card.test} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8 px-10">
          {categoryCards.map((card) => (
            <MediaCard
              key={card.id}
              categoryName={card.categoryName}
              image={card.image}
              onReadMoreClick={() => handleReadMoreClick(card.categoryName)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-1 mb-4 px-4">
        {!showDetails ? (
          <>
            <div className="col-span-2">
              <div className="grid grid-cols-1 gap-5 mt-5 px-7">
                {dateBox.map((card) => (
                  <DateBox
                    key={card.id}
                    count={card.count}
                    test={card.test}
                    image={card.image}
                  />
                ))}
              </div>
            </div>
            <div className="">
              <div className="flex flex-col items-end mt-4 px-4">
                <div className="border border-gray-300 p-2 w-100 h-100 flex items-center justify-center bg-white mb-4 px-2">
                  <CustomDatePicker
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-6 mt-8 px-10">
            <h2>{selectedCategory}</h2>
            <p>Details about {selectedCategory}</p>
            <button onClick={handleBackClick}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
