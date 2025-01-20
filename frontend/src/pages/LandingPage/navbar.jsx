import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
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
                <a href="#home" className="text-gray-600 hover:text-blue-600">
                    Home
                </a>
                <a href="#events" className="text-gray-600 hover:text-blue-600">
                    Events
                </a>
                <a href="#facilities" className="text-gray-600 hover:text-blue-600">
                    Facilities
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600">
                    Contact
                </a>
            </div>

            {/* Search and Buttons */}
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="hidden lg:block px-4 py-2 border rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                    onClick={() => navigate('/login')}
                >
                    Log In
                </button>
                <button
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                    onClick={() => navigate('/register')}
                >
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
