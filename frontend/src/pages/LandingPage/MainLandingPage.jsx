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

  // Reference for the Introduction and Image Slider Section
  const introSectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);

  const scrollToIntroSection = () => {
    introSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-blue-100 py-20">
        <div className="absolute inset-0">
          <img
            src="https://pbs.twimg.com/media/D-mZayXWkAESK5j.jpg" // Replace with your image URL
            alt="University Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          {/* Left Content */}
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

      {/* Introduction and Image Slider Section */}
      <section ref={introSectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Left Side: Introduction */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              About Unigym
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Welcome to the University of Peradeniya Gymnasium, a state-of-the-art facility designed to promote health, wellness, and fitness for students, staff, and the community. Explore our diverse programs, modern equipment, and engaging classes tailored to meet your fitness goals.
            </p>
          </div>

          {/* Right Side: Image Slider */}
          <div className="md:w-1/2">
            <div className="relative w-full rounded-3xl h-64 overflow-hidden">
              {/* Image Slider */}
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
      <section className="py-4 justify-center text-center bg-gray-100">
        <div className="flex justify-center">
            <h2 className="text-3xl font-bold text-blue-900">Facilities</h2>
        </div>
      </section>
        <CardList />
      <Footer />
    </div>
  );
};

export default MainLandingPage;
