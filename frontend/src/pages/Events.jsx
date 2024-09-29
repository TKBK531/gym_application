import { useState } from "react";

const Events = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));

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
        <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">
          Hello, {userData.user.first_name} {userData.user.last_name}👋{" "}
        </h1>
      </div>
    </div>
  );
};

export default Events;
