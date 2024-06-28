import { useEffect, useState } from "react";
import api from "../api";
import SportCard from "../components/Sport/SportCard";
import { userTypes } from "../constants/index";

const Sports = () => {
  const [allSports, setAllSports] = useState([]);
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [filteredSports, setFilteredSports] = useState([]); // State for filtered results
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userType = getLoggedInUserType();
    setLoggedInUserType(userType.name);
    console.log("Logged in user type:", userType.name);
    fetchAllSports();
  }, []);

  useEffect(() => {
    // Filtering logic based on search query
    const newFilteredSports = allSports.filter((sport) =>
      sport.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSports(newFilteredSports);
  }, [allSports, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchAllSports = async () => {
    try {
      const response = await api.get("/sport/all-sports/");
      if (response.data.status === "success") {
        console.log("All sports fetched successfully");
        setAllSports(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const getLoggedInUserType = () => {
    const storedUser = JSON.parse(localStorage.getItem("userType"));
    const userType = userTypes.find((type) => type.pk === storedUser);
    return userType;
  };

  return (
    // <section>
    //   <div>
    //     <div className="flex flex-wrap justify-center">
    //       {allSports.map((sport) => (
    //         <SportCard key={sport.id} sport={sport} />
    //       ))}

    //       {loggedInUserType === "admin" && ( // Render only if isAdmin is true
    //         <div className="flex flex-col w-full max-w-sm rounded-lg overflow-hidden shadow-xl bg-white m-4 transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[24rem] text-center justify-center">
    //           <h3 className="text-xl font-semibold text-gray-700 mb-2 transition duration-300 hover:text-blue-500 text-balance">
    //             Add Another Sport
    //           </h3>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </section>
    <section className="w-full">
      <div className="flex flex-wrap justify-center mb-5">
        {" "}
        {/* Added some spacing for the search bar */}
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
          <SportCard key={sport.id} sport={sport} />
        ))}

        {loggedInUserType === "admin" && (
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
