import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import SportCard from "../components/Sport/SportCard";

const Sports = () => {
  const [allSports, setAllSports] = useState([]);
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("alphabetical"); // State for sorting method

  const navigate = useNavigate();

  const filteredSports = allSports.filter((sport) =>
    sport.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initialFetchComplete = useRef(false);

  useEffect(() => {
    fetchAllSports();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handleSportClick = (sportId) => {
    const sport = allSports.find((sport) => sport.id === sportId);
    console.log("Navigating to sport:", sport.id);
    navigate(
      `/sports/${sport.label.toLowerCase().replace(/\s+/g, "-")}?id=${sportId}`
    );
  };

  const fetchAllSports = async () => {
    try {
      const response = await api.get("/sport/all-sports/");
      if (response.data.status === "success") {
        setAllSports(response.data.data);
        initialFetchComplete.current = true;
        getLoggedInUserType();
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const getLoggedInUserType = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const userType = storedUser.profile.user_type;
    console.log("Stored user:", storedUser);
    setLoggedInUserType(userType);
    return userType;
  };

  const sortSports = (sports) => {
    switch (sortMethod) {
      case "alphabetical":
        return sports.sort((a, b) => a.label.localeCompare(b.label));
      case "reverse-alphabetical":
        return sports.sort((a, b) => b.label.localeCompare(a.label));
      default:
        return sports;
    }
  };

  const sortedSports = sortSports(filteredSports);

  return (
    <>
      <section className="w-full">
        <div className="flex gap-5 flex-wrap justify-center mb-5">
          <input
            type="text"
            placeholder="Search sports..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded p-2 w-full md:w-1/2"
          />
          <select
            value={sortMethod}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="alphabetical">A-Z</option>
            <option value="reverse-alphabetical">Z-A</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center">
          {(searchQuery ? sortedSports : sortSports(allSports)).map((sport) => (
            <SportCard
              key={sport.id}
              sport={sport}
              onClick={() => handleSportClick(sport.id)}
<<<<<<< HEAD
              className={`transition-opacity cursor-pointer duration-500 ${initialFetchComplete.current && !filteredSports.includes(sport)
                ? "opacity-0"
                : "opacity-100"
=======
              // Conditional style for animation
              className={`transition-opacity cursor-pointer duration-500 ${initialFetchComplete.current && !filteredSports.includes(sport)
                ? "opacity-0" // Hide when filtered out
                : "opacity-100" // Show when not filtered out or data hasn't loaded
>>>>>>> 64c68e5 (FEAT: Added the functionality to sort by alphabatical order)
                }`}
            />
          ))}

          {initialFetchComplete.current && loggedInUserType === "admin" && (
            <div className="flex flex-col w-full max-w-sm rounded-lg overflow-hidden shadow-xl bg-white m-4 transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[24rem] text-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2 transition duration-300 hover:text-blue-500 text-balance">
                Add Another Sport
              </h3>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Sports;