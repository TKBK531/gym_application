import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (loggedInStatus === "true" && userData) {
            setIsLoggedIn(true);
            setProfilePicture(userData.profile.profile_picture);
            setLoggedInUserName(userData.user.last_name);
        }
    }, []);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full">
                    <span className="text-white font-bold text-lg">🏋️</span>
                </div>
                <span className="text-xl font-bold text-gray-800">UniGym</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                    Home
                </Link>
                <Link to="/events" className="text-gray-600 hover:text-blue-600">
                    Events
                </Link>
                <Link to="/facilities" className="text-gray-600 hover:text-blue-600">
                    Facilities
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                    Contact
                </Link>
                {isLoggedIn && (
                    <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                        Dashboard
                    </Link>
                )}
            </div>

            {/* Search and Buttons */}
            <div className="flex items-center space-x-4">
                {!isLoggedIn ? (
                    <>
                        <button
                            className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                        <button
                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                            onClick={() => document.getElementById("userMenu").classList.toggle("hidden")}
                        >
                            <img src={profilePicture} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            <span>{loggedInUserName}</span>
                        </button>
                        <div id="userMenu" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden">
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile
                            </Link>
                            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;