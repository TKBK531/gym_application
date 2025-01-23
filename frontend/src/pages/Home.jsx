import { useState, useEffect } from "react";
import InfoCard from "../components/Dashboard/InfoCard";
import UpcomingEvents from "../components/Dashboard/UpcommingEvents";
import LatestAnnouncements from "../components/Dashboard/LatestAnnouncements";
import api from "../api";
import { Card, CardContent } from "../components/ui/card";

const Home = () => {
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [eventCountInNext30Days, setEventCountInNext30Days] = useState(0);
  const [eventDetails, setEventDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestAnnouncements, setLatestAnnouncements] = useState([]);
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const user_type = user_data.profile.user_type;

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

  const fetchLatestAnnouncements = async () => {
    try {
      const response = await api.get("/sport/recent-announcements/");
      if (response.data.status === "success") {
        setLatestAnnouncements(response.data.data);
        console.log("Latest announcements:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching latest announcements:", error.message);
    }
  };

  useEffect(() => {
    fetchTotalUserCount();
    fetchEventCountAndDetails();
    fetchLatestAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="lg:w-full mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Content Section */}
        <div className="flex-1">
          {/* Header Section */}
          <Card className="bg-primary-shade-4 text-white mb-6 shadow-md">
            <CardContent className="pt-16 pb-16 pl-4 pr-4">
              {(user_type === 'admin' || user_type === 'staff') && (
                <h1 className="text-2xl font-bold">Welcome to Admin Dashboard!</h1>
              )}
              {(user_type !== 'admin' && user_type !== 'staff') && (
                <h1 className="text-2xl font-bold pb-5">Welcome {user_data.user.first_name} {user_data.user.last_name}!</h1>
              )}
              <p className="text-sm">
                Stay updated with University sports events and activities!
              </p>
            </CardContent>
          </Card>

          <section className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(user_type === 'admin' || user_type === 'staff') && (
                <InfoCard
                  title="Total Users"
                  value={totalUserCount}
                  description="Number of active users"
                />
              )}
              <InfoCard
                title="Upcoming Events"
                value={eventCountInNext30Days}
                description="Events in the next 30 days"
              />
              <InfoCard
                title="Latest Announcements"
                value={latestAnnouncements.length}
                description="Latest announcements in the past week"
              />
              <InfoCard
                title="New Reservations"
                value="25"
                description="New users signed up this week"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="lg:w-full">
          <UpcomingEvents events={eventDetails} isLoading={isLoading} />
        </div>
        <div className="lg:w-full">
          <LatestAnnouncements announcements={latestAnnouncements} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Home;