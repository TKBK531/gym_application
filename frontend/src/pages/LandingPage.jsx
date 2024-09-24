import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary-red text-white p-5">
        <h1 className="text-3xl">University of Peradeniya Gymnasium</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-5">
        <section className="bg-secondary-golden p-10 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl mb-4">Welcome to the Gymnasium</h2>
          <p className="mb-4">
            Join us to stay fit and healthy. Explore our facilities and programs
            designed for everyone.
          </p>
          <button
            className="bg-primary-shade-1 text-white py-2 px-4 rounded hover:bg-primary-shade-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </section>
        <section>
          <h2 className="text-2xl mb-4">Features</h2>
          <ul className="list-disc list-inside">
            <li>State-of-the-art equipment</li>
            <li>Personal training sessions</li>
            <li>Group fitness classes</li>
          </ul>
        </section>
      </main>
      <footer className="bg-info-dark-blue text-white p-5 text-center">
        <p>
          &copy; 2023 University of Peradeniya Gymnasium. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
