import Navbar from "./Navbar";

const MainLandingPage = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-blue-100 py-20">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/11/a6/ae/11a6aeb5206a09fd2c5ddecdecb19488.jpg" // Replace with your image URL
            alt="University Gym"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Wellcome to Unigym
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              University of Peradeniya Gymnasium
            </p>
            <button className="bg-primary-red text-white px-6 py-3 rounded-lg hover:bg-red-700">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search for activities, schedules, or information..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-primary-red text-white px-6 py-2 rounded-r-lg hover:bg-red-700">
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainLandingPage;
