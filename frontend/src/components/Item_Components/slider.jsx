// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Slider = () => {
  const images = [
    "https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/277124/pexels-photo-277124.jpeg",
    "https://images.pexels.com/photos/5767580/pexels-photo-5767580.jpeg",
    "https://images.pexels.com/photos/8007419/pexels-photo-8007419.jpeg",
    "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute block w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full relative">
              {/* Image with reduced opacity */}
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover opacity-90"
              />
              {/* Black overlay to enhance contrast */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              {/* Overlay text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2
                  className="text-white text-5xl font-bold p-4 rounded-lg text-center"
                  style={{
                    textShadow:
                      "2px 2px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black, 1px 1px 0px black",
                  }}
                >
                  Equipments
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
