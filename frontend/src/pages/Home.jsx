import InfoCard from "../components/Dashboard/InfoCard";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">
          Welcome, {userData?.user.last_name || "User"}!
        </h1>
        <p className="text-gray-600">
          Here's a summary of your account activity.
        </p>
      </header>

      <section className="mb-4">
        {/* <h2 className="text-xl font-semibold mb-2">Quick Stats</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Activity Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Graph content here (e.g., a chart component).</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="list-disc list-inside">
            <li>User A signed up</li>
            <li>User B made a purchase</li>
            <li>User C updated their profile</li>
            <li>More activity...</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
