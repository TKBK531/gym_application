import { useState, useEffect } from "react";
import Table from "../components/Table";
import UpcomingEvents from "../components/Dashboard/UpcommingEvents";
import api from "../api";

const Events = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [eventDetails, setEventDetails] = useState([]);

  const categories = [
    {
      name: "Sports",
      description: "Details about sports events.",
      image: "https://superblog.supercdn.cloud/site_cuid_clr6oh1no0006rmr89yhkxgu8/images/various-sport-equipments-generative-ai-1706958639790-original.jpg",
    },
    {
      name: "Musical Shows",
      description: "Details about music events.",
      image: "https://weezevent.com/wp-content/uploads/2018/08/27184514/organiser-un-concert-en-7-etapes.jpg",
    },
    {
      name: "Other Functions",
      description: "Details about other functions.",
      image: "https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.edu.dailymirror.lk/uploads/articles_14_b7e63065df.jpg",
    },
  ];

  const handleReadMoreClick = (categoryName) => {
    setSelectedCategory(categories.find((c) => c.name === categoryName));
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
    setSelectedCategory(null);
  };

  const handleEventClick = (categoryName) => {
    handleReadMoreClick(categoryName);
  };

  const fetchEventCountAndDetails = async () => {
    try {
      const response = await api.get("/event/events-in-this-month/");
      if (response.data.status === "success") {
        setEventDetails(response.data.data.event_details);
        console.log("Upcoming events:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching upcoming events:", error.message);
    }
  };

  useEffect(() => {
    fetchEventCountAndDetails();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 px-6 py-8">
        <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">
          Hello, {userData.user.first_name} {userData.user.last_name} 👋
        </h1>
      </div>

      <div className="p-6">
        {!showDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  <button
                    onClick={() => handleReadMoreClick(category.name)}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory.name} Details
            </h2>
            <p>{selectedCategory.description}</p>
            <Table selectedCategory={selectedCategory.name} />
            <button
              onClick={handleBackClick}
              className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        )}
      </div>

      <UpcomingEvents events={eventDetails} isLoading={false} onEventClick={handleEventClick} />
    </div>
  );
};

export default Events;