import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-regal-sunset-start to-regal-sunset-end relative overflow-hidden">
      {/* Additional background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-royal-contrast-start to-royal-contrast-end opacity-50 mix-blend-overlay blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary-golden to-primary-shade-2 rounded-full opacity-30 blur-3xl"></div>

      <div className="bg-white/90 p-12 rounded-3xl shadow-lg max-w-md text-center relative z-10">
        <h1 className="text-8xl font-extrabold font-poppins bg-clip-text text-transparent bg-gradient-to-br from-primary-shade-1 to-primary-shade-5 mb-4">
          404
        </h1>
        <p className="text-xl text-info-dark-blue font-poppins mb-8">
          Oops! The page you&apos;re looking for seems to have wandered off the
          map.
        </p>
        <Link
          to="/"
          className="bg-fiery-depth bg-clip-text text-transparent hover:text-secondary-golden font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 font-poppins heading4"
        >
          Lead Me Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
