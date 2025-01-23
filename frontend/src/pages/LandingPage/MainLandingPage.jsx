import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CardList from "./CardList";

const MainLandingPage = () => {
  const images = [
    "https://island.lk/wp-content/uploads/2024/03/gym.jpg",
    "https://slusa.lk/wp-content/gallery/university-of-peradeniya/pdn6.jpg",
    "https://pbs.twimg.com/media/D-mZayXWkAESK5j.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // References for sections
  const introSectionRef = useRef(null);
  const facilitiesSectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  // Scroll handlers
  const scrollToIntroSection = () => {
    introSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFacilitiesSection = () => {
    facilitiesSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Pass scroll handlers to Navbar */}
      <Navbar scrollToFacilities={scrollToFacilitiesSection} />
      {/* Hero Section */}
      <section className="relative bg-blue-100 py-20">
        <div className="absolute inset-0">
          <img
            src="https://pbs.twimg.com/media/D-mZayXWkAESK5j.jpg"
            alt="University Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1
              className="text-4xl font-bold text-white mb-4"
              style={{
                textShadow: "2px 2px 4px black",
              }}
            >
              Welcome to Gymnasium
            </h1>
            <p className="text-lg text-white mb-6">University of Peradeniya</p>
            <button
              className="bg-primary-red text-white px-3 py-2 rounded-lg hover:bg-red-700"
              onClick={scrollToIntroSection}
            >
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

      {/* Introduction Section */}
      <section ref={introSectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              About Gymnasium
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Welcome to the University of Peradeniya Gymnasium, a premier
              facility dedicated to fostering health, wellness, and fitness
              among students, staff, and the wider community. Our
              state-of-the-art infrastructure, cutting-edge equipment, and
              expertly designed programs are tailored to meet a variety of
              fitness goals.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full rounded-3xl h-64 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section ref={facilitiesSectionRef} className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Facilities</h2>
          <p className="text-gray-700 text-lg">
            Discover the exceptional facilities we offer to support your fitness
            and wellness journey.
          </p>
        </div>
        <CardList />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLandingPage;
