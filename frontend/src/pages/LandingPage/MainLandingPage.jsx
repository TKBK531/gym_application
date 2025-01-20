import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLandingPage = () => {
    return (
        <div>
            <Navbar />
            <div className="main-content p-6 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="relative h-96 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('https://site.pdn.ac.lk/student/sprtpdn/img/facimg/gym.jpg')` }}>
                        <div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold">Welcome to UniGym</h1>
                            <p className="text-lg md:text-2xl mt-4">Explore our top-notch facilities</p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Track Your Steps</h2>
                            <p className="text-gray-700">
                                Keep track of your daily steps and stay motivated to reach your fitness goals.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Monitor Your Mood</h2>
                            <p className="text-gray-700">
                                Log your mood daily and get insights into your mental well-being.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Calorie Tracking</h2>
                            <p className="text-gray-700">
                                Track your calorie intake and ensure you are meeting your dietary goals.
                            </p>
                        </div>
                    </section>

                    {/* Events Section */}
                    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center">
                                <span>Yoga Class</span>
                                <span>March 25, 2023</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Marathon</span>
                                <span>April 10, 2023</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Nutrition Workshop</span>
                                <span>May 5, 2023</span>
                            </li>
                        </ul>
                    </section>

                    {/* Testimonials Section */}
                    <section className="bg-white p-8 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-gray-700">
                                    &quot;UniFit has completely transformed my fitness journey. The step tracking feature keeps me motivated every day!&quot;
                                </p>
                                <p className="text-right text-gray-500">- John Doe</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-gray-700">
                                    &quot;I love the mood tracker. It helps me stay in tune with my mental health.&quot;
                                </p>
                                <p className="text-right text-gray-500">- Jane Smith</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLandingPage;