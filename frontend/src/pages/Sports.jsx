import { useState } from "react";
import api from "../api";
import SportCard from "../components/Sport/SportCard";

const Sports = () => {
  const [allSports, setAllSports] = useState([]);

  const fetchAllSports = async () => {
    try {
      const response = await api.get("/sport/all-sports/");
      if (response.data.status === "success") {
        console.log("All sports fetched successfully");
        setAllSports(response.data.data);
        console.log(allSports);
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  return (
    <section>
      <div>
        <button
          onClick={fetchAllSports}
          className="bg-amber-300 p-5 hover:bg-amber-600"
        >
          Get all Sports
        </button>
      </div>
      <div>
        <div className="flex flex-wrap justify-center">
          {allSports.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sports;
