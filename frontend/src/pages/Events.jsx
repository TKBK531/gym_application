import CountingCard from "../components/CountingCard";
import React from "react";
import countingCards, {categoryCards} from "../constants/index";
import CategoryCard from "../components/CategoryCard";
import EventCalenderComponent from "../components/EventCalenderComponent";

const Events = () => (
  <div>
    <div>
      <h1>Hello Alesia K. 👋 </h1> 
      <div className="grid grid-cols-3 gap-4 mt-10"> {countingCards.map((card) => (
          <CountingCard
            key={card.id}
            count={card.count}
            test={card.test}
          />
        ))} </div>
        
      <div className="grid grid-cols-3 gap-6 mt-8 px-10 "> {categoryCards.map((card) => (
          <CategoryCard
            key={card.id}
            categoryName={card.categoryName}
            
          />
        ))}

      </div>

      <div>EventCalenderComponent</div>
      
    </div>
  </div>
);

export default Events;
