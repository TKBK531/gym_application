import { useState, useEffect } from "react";
import InfoCard from "../components/Dashboard/InfoCard";
import DonutChart from "../components/Charts/DonutChart";
import UpcomingEvents from "../components/Dashboard/UpcommingEvents";
import api from "../api";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [eventCountInNext30Days, setEventCountInNext30Days] = useState(0);
  const [eventDetails, setEventDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTotalUserCount = async () => {
    try {
      const response = await api.get("/user/total-users/");
      if (response.data.status === "success") {
        setTotalUserCount(response.data.data);
        console.log("Total users:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching total users:", error.message);
    }
  };

  const fetchEventCountAndDetails = async () => {
    try {
      const response = await api.get("/event/events-in-this-month/");
      if (response.data.status === "success") {
        setEventCountInNext30Days(response.data.data.event_count);
        setEventDetails(response.data.data.event_details);
        console.log("Upcoming events:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching upcoming events:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalUserCount();
    fetchEventCountAndDetails();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userData?.user.last_name || "User"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s a summary of your account activity.
        </p>
      </header>

      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <InfoCard
            title="Total Users"
            value={totalUserCount}
            description="Number of active users"
          />
          <InfoCard
            title="Upcoming Events"
            value={eventCountInNext30Days}
            description="Events in the next 30 days"
          />
          <InfoCard
            title="New Signups"
            value="123"
            description="New users signed up this week"
          />
          <InfoCard
            title="New Signups"
            value="123"
            description="New users signed up this week"
          />
        </div>
      </section>

      <section className="mb-6 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Activity Overview
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <DonutChart />
          </div>
        </div>
        <div className="lg:w-1/2">
          <UpcomingEvents events={eventDetails} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
};

export default Home;