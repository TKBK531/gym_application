import InfoCard from "../components/Dashboard/InfoCard";
import DonutChart from "../components/Charts/DonutChart";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

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
            value="1,234"
            description="Number of active users"
          />
          <InfoCard
            title="Revenue"
            value="$12,345"
            description="Total revenue this month"
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul className="list-disc list-inside text-gray-700">
              <li>User A signed up</li>
              <li>User B made a purchase</li>
              <li>User C updated their profile</li>
              <li>More activity...</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
