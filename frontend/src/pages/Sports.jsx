import { useEffect, useState, useRef } from "react";
import api from "../api";
import SportCard from "../components/Sport/SportCard";
import { userTypes } from "../constants/index";

const Sports = () => {
  const [allSports, setAllSports] = useState([]);
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSports = allSports.filter((sport) =>
    sport.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ref to help track if initial data fetch is complete
  const initialFetchComplete = useRef(false);

  useEffect(() => {
    const userType = getLoggedInUserType();
    console.log(userType);

    setLoggedInUserType(userType.name);
    console.log("User type:", userType.name);
    fetchAllSports();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSportClick = (sportId, sportLabel) => {
    console.log("Clicked sport:", { id: sportId, label: sportLabel });
  };

  const fetchAllSports = async () => {
    try {
      const response = await api.get("/sport/all-sports/");
      if (response.data.status === "success") {
        setAllSports(response.data.data);
        initialFetchComplete.current = true; // Mark fetch as done
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const getLoggedInUserType = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    console.log("Stored user type:", storedUser.user_type);
    const userType = userTypes.find(
      (type) => type.name === storedUser.user_type
    );
    return userType;
  };

  return (
    <section className="w-full">
      <div className="flex flex-wrap justify-center mb-5">
        <input
          type="text"
          placeholder="Search sports..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded p-2 w-full md:w-1/2"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {(searchQuery ? filteredSports : allSports).map((sport) => (
          <SportCard
            key={sport.id}
            sport={sport}
            onClick={() => handleSportClick(sport.id, sport.label)}
            // Conditional style for animation
            className={`transition-opacity duration-500 ${
              initialFetchComplete.current && !filteredSports.includes(sport)
                ? "opacity-0" // Hide when filtered out
                : "opacity-100" // Show when not filtered out or data hasn't loaded
            }`}
          />
        ))}

        {/* Conditionally show "Add Another Sport" card only after initial data fetch */}
        {initialFetchComplete.current && loggedInUserType === "admin" && (
          <div className="flex flex-col w-full max-w-sm rounded-lg overflow-hidden shadow-xl bg-white m-4 transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[24rem] text-center justify-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2 transition duration-300 hover:text-blue-500 text-balance">
              Add Another Sport
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sports;
