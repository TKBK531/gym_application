import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/uni_logo.png";

const Navbar = ({ scrollToFacilities }) => {
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
        navigate("/logout");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <div>
                    <img
                        src={logo}
                        alt="UniLogo"
                        className="w-44 h-full object-cover"
                    />
                </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-primary-red">
                    Home
                </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToFacilities();
                    }}
                    className="text-gray-600 hover:text-primary-red"
                >
                    Facilities
                </button>
                <Link to="" className="text-gray-600 hover:text-primary-red">
                    Contact
                </Link>
                {isLoggedIn && (
                    <Link to="/dashboard" className="text-gray-600 hover:text-primary-red">
                        Dashboard
                    </Link>
                )}
            </div>

            {/* Search and Buttons */}
            <div className="flex items-center space-x-4">
                {!isLoggedIn ? (
                    <>
                        <button
                            className="px-4 py-2 text-white bg-primary-red rounded-full hover:bg-white hover:text-primary-red border border-primary-red"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                        <button
                            className="px-4 py-2 text-primary-red border border-primary-red rounded-full hover:bg-primary-shade-2 hover:text-white"
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                            onClick={() =>
                                document.getElementById("userMenu").classList.toggle("hidden")
                            }
                        >
                            <img
                                src={profilePicture}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>{loggedInUserName}</span>
                        </button>
                        <div
                            id="userMenu"
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden"
                        >
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
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

Navbar.propTypes = {
    scrollToFacilities: PropTypes.func.isRequired,
};

export default Navbar;
