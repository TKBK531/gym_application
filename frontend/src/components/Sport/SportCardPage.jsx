import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";

const SportCardPage = () => {
  const [sportData, setSportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sportId = searchParams.get("id");

  useEffect(() => {
    const fetchSportData = async () => {
      if (sportId) {
        // Fetch only if sportId is available
        try {
          const response = await api.get(`/sport/${sportId}/`);
          if (response.data.status === "success") {
            setSportData(response.data.data);
          } else {
            console.error("Error fetching sport data:", response.data.message);
            setError(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching sport data:", error.message);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSportData();
  }, [sportId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      {sportData ? (
        <>
          <h2 className="text-2xl font-bold mb-4 w-full text-center">
            {sportData.label}
          </h2>
          <img
            src={
              sportData.image
                ? sportData.image
                : "http://127.0.0.1:8000/media/images/sport_images/baseball.webp"
            }
            className="object-cover rounded-md object-center w-full h-[50vh] transform transition duration-500 ease-out"
            alt=""
          />
          <p className="text-gray-700 my-4">
            In Charge :{" "}
            {sportData.in_charge_name
              ? sportData.in_charge_name
              : "No in charge assigned yet"}
          </p>
        </>
      ) : (
        <div>Sport not found!</div> // Handle case where sportData is null
      )}
    </section>
  );
};

export default SportCardPage;
