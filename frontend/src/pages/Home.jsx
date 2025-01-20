import { useState, useEffect } from "react";
import InfoCard from "../components/Dashboard/InfoCard";
import DonutChart from "../components/Charts/DonutChart";
import UpcomingEvents from "../components/Dashboard/UpcommingEvents";
import api from "../api";
import Rightbar from "./rightbar";
import { Card, CardContent } from "../components/ui/card";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Content Section */}
        <div className="flex-1">
          {/* Header Section */}
          <Card className="bg-primary-shade-4 text-white mb-6 shadow-md">
            <CardContent className="pt-16 pb-16 pl-4 pr-4">
              <h1 className="text-2xl font-bold">Welcome to UniFit!</h1>
              <p className="text-sm">
                Stay updated with UniFit events and activities. Make your reservations today!
              </p>
            </CardContent>
          </Card>

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

          {/* Mood Tracker */}
          <Card className="shadow-md">
            <CardContent>
              <h2 className="text-xl font-bold">Mood tracker</h2>
              <p className="text-2xl font-semibold mt-2">Happy</p>
            </CardContent>
          </Card>

          {/* Calories Burned */}
          <Card className="shadow-md">
            <CardContent>
              <h2 className="text-xl font-bold">Calories burned today</h2>
              <p className="text-2xl font-semibold mt-2">649 kcal</p>
            </CardContent>
          </Card>

          {/* Predicted Period Dates */}
          <Card className="shadow-md md:col-span-2">
            <CardContent>
              <h2 className="text-xl font-bold">Predicted period dates</h2>
              <div className="flex gap-2 mt-2">
                {[27, 28, 29, 30, 31, 1, 2, 3].map((date, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 rounded-lg text-sm"
                  >
                    {date}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calorie Intake Summary */}
          <Card className="shadow-md lg:col-span-2">
            <CardContent>
              <h2 className="text-xl font-bold">Calorie intake summary</h2>
              <div className="mt-4">
                <div>
                  <p className="text-sm">Calories consumed</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">2,700 (of 2,500)</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm">Carbohydrates intake</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">163 (of 253)</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm">Fat intake</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">53 (of 15)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Tracking */}
          <Card className="shadow-md">
            <CardContent>
              <h2 className="text-xl font-bold">Track your sleep</h2>
              <ul className="mt-2 text-sm space-y-2">
                <li>REM sleep analysis: 22%</li>
                <li>Deep sleep insights: 52%</li>
                <li>Light sleep: 16%</li>
              </ul>
            </CardContent>
          </Card>

          {/* Available Activities */}
          <Card className="shadow-md">
            <CardContent>
              <h2 className="text-xl font-bold">Available Activities</h2>
              <div className="mt-4">
                <p className="text-sm mb-2">Reserve Stay | Upcoming Item</p>
                <p className="text-sm mb-2">Dates: 27-31</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                  Manage profile
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="lg:w-1/2">
        <UpcomingEvents events={eventDetails} isLoading={isLoading} />
      </div>
    </div>

  );
};

export default Home;