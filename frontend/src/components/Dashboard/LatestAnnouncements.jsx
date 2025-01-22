import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LatestAnnouncements = ({ announcements, isLoading }) => {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef(null);

    const handleAnnouncementClick = (sportName, sportId) => {
        const formattedSportName = sportName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/sports/${formattedSportName}?id=${sportId}`);
    };

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    const handleShowLess = () => {
        setVisibleCount(3);
    };

    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.scrollHeight;
            containerRef.current.style.height = `${height}px`;
        }
    }, [visibleCount, announcements]);

    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
            });
            resizeObserver.observe(containerRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Announcements</h2>
            <div
                ref={containerRef}
                style={{ transition: 'height 0.5s ease-in-out' }}
                className="overflow-hidden"
            >
                <ul className="space-y-4">
                    {isLoading
                        ? Array(visibleCount).fill().map((_, index) => (
                            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="animate-pulse">
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </li>
                        ))
                        : announcements.slice(0, visibleCount).map((announcement) => (
                            <li
                                key={announcement.id}
                                className="p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition"
                                onClick={() => handleAnnouncementClick(announcement.sport_name, announcement.sport)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                                    <span className="bg-red-100 text-primary-shade-3 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        {announcement.sport_name}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">{announcement.description}</p>
                                <p className="text-sm text-gray-500">{new Date(announcement.created_at).toLocaleDateString()}</p>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="text-center mt-4">
                {visibleCount < announcements.length && !isLoading && (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                )}
                {visibleCount > 3 && (
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

LatestAnnouncements.propTypes = {
    announcements: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            sport: PropTypes.number.isRequired,
            sport_name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default LatestAnnouncements;