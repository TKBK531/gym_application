import PropTypes from "prop-types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UpcomingEvents = ({ events, isLoading, onEventClick }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 2);
    };

    const handleShowLess = () => {
        setVisibleCount(2);
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {console.log("Event", events)}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
            <ul className="space-y-4">
                {isLoading
                    ? Array(visibleCount).fill().map((_, index) => (
                        <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div>
                                <Skeleton width={150} height={20} />
                                <Skeleton width={100} height={15} />
                            </div>
                            <div className="text-right">
                                <Skeleton width={100} height={20} />
                                <Skeleton width={80} height={15} />
                            </div>
                        </li>
                    ))

                    : sortedEvents.slice(0, visibleCount).map((event) => (
                        <li
                            key={event.id}
                            className={`flex justify-between items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer`}
                            onClick={() => onEventClick(event.category)}

                        >
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{event.name}</p>
                                <p className="text-sm text-gray-500">{event.place}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">{event.time}</p>
                            </div>
                        </li>
                    ))}
            </ul>
            <div className="text-center mt-4">
                {visibleCount < sortedEvents.length && !isLoading && (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                )}
                {visibleCount > 2 && (
                    <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 ml-4"
                        onClick={handleShowLess}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

UpcomingEvents.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            place: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    onEventClick: PropTypes.func.isRequired,
};

export default UpcomingEvents;