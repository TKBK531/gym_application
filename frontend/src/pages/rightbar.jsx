import React from "react";

const Rightbar = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
            {/* Header Section */}
            <div className="text-center">
                <img
                    src="https://via.placeholder.com/100" // Replace with your actual image URL
                    alt="Activities"
                    className="mx-auto w-24 h-24 rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold">Available Activities</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Check out available activities
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around mt-4">
                <button className="text-blue-500 text-sm font-semibold">Reserve</button>
                <button className="text-blue-500 text-sm font-semibold">Stay</button>
                <button className="text-blue-500 text-sm font-semibold">Upcomin</button>
                <button className="text-blue-500 text-sm font-semibold">Make</button>
                <button className="text-blue-500 text-sm font-semibold">Check</button>
            </div>

            {/* Dates Section */}
            <div className="flex justify-around mt-4">
                {[27, 28, 29, 30, 31].map((date, index) => (
                    <div
                        key={index}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${date === 29
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {date === 27
                            ? "Manage"
                            : date === 28
                                ? "Ground"
                                : date === 29
                                    ? "Pool"
                                    : date === 30
                                        ? "Event"
                                        : "Equipm"}
                    </div>
                ))}
            </div>

            {/* Ground Bookings Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Ground bookings</h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                        <span className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2.25v19.5m9.75-9.75H2.25"
                                />
                            </svg>
                        </span>
                        <p className="text-gray-700">Yoga class booking</p>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 12h-9m4.5-4.5l-4.5 4.5 4.5 4.5"
                                />
                            </svg>
                        </span>
                        <p className="text-gray-700">Dental check-up booking</p>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="bg-gray-100 p-2 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2.25-2.25L15 12m0 0l-2.25 2.25L9 12m6 0H9"
                                />
                            </svg>
                        </span>
                        <p className="text-gray-700">Meditation session reminder</p>
                    </li>
                </ul>
            </div>

            {/* Manage Profile Button */}
            <div className="mt-6 text-center">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold">
                    Manage profile
                </button>
            </div>
        </div>
    );
};

export default Rightbar;