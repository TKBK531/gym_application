import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import TabsButton from "../Buttons/TabsButton";
import Announcements from "./Tabs/Announcements";
import Team from "./Tabs/Team";
import Schedule from "./Tabs/Schedule";

const SportCardPage = () => {
  const [sportData, setSportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("announcements");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sportId = searchParams.get("id");

  useEffect(() => {
    const fetchSportData = async () => {
      if (sportId) {
        try {
          const response = await api.get(`/sport/${sportId}/`);
          if (response.data.status === "success") {
            setSportData(response.data.data);
          } else {
            console.error("Error fetching sport data:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching sport data:", error.message);
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

  const changeSelectedTab = (tab) => {
    setSelectedTab(tab);
  };

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
          <div className="flex gap-2 my-4">
            <TabsButton
              text="Announcements"
              isActive={selectedTab === "announcements"}
              onClick={() => changeSelectedTab("announcements")}
            />
            <TabsButton
              text="Team"
              isActive={selectedTab === "team"}
              onClick={() => changeSelectedTab("team")}
            />
            <TabsButton
              text="Schedule"
              isActive={selectedTab === "schedule"}
              onClick={() => changeSelectedTab("schedule")}
            />
          </div>

          {selectedTab === "announcements" && (
            <Announcements sportData={sportData} />
          )}
          {selectedTab === "team" && <Team sportData={sportData} />}
          {selectedTab === "schedule" && <Schedule sportData={sportData} />}
        </>
      ) : (
        <div>Sport not found!</div>
      )}
    </section>
  );
};

export default SportCardPage;
