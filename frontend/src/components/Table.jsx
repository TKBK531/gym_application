import { useState } from 'react';

const Table = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staffMode, setStaffMode] = useState(userRole === 'staff' || userRole === 'admin');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    sport: '',
    place: '',
    time: '',
    date: '',
    status: 'On going'
  });

  const userData = JSON.parse(localStorage.getItem("userData"));
  const user_type = userData.profile.user_type;

  // List of sports for the dropdown
  const sportsList = [
    'Badminton (Women)', 'Badminton (Men)', 'Basketball (Women)', 'Basketball (Men)', 'Carrom', 'Chess (Women)', 
    'Chess (Men)', 'Cricket', 'Elle (Women)', 'Elle (Men)', 'Football', 'Hockey (Women)', 'Karate (Women)', 
    'Karate (Men)', 'Kick Boxing', 'Netball', 'Power Lifting', 'Road Race', 'Rugby Football', 'Taekwondo (Women)', 
    'Taekwondo (Men)', 'Track & Field (Men & Women)', 'Track & Field (Men)', 'Swimming (Men)', 'Table Tennis (Women)', 
    'Table Tennis (Men)', 'Tennis (Men)', 'Volleyball (Women)', 'Volleyball (Men)', 'Weight Lifting', 'Wrestling'
  ];

  const [events, setEvents] = useState([
    { sport: 'Cricket', place: 'Cricket Ground', time: '10:00 AM', date: '13/05/2022', status: 'On going' },
    { sport: 'Chess (Women)', place: 'Gym', time: '10:00 AM', date: '13/05/2022', status: 'Cancel' },
    { sport: 'Volleyball (Men)', place: 'Cricket Ground', time: '10:00 AM', date: '13/05/2022', status: 'On going' },
    { sport: 'Karate (Men)', place: 'Cricket Ground', time: '10:00 AM', date: '13/05/2022', status: 'Up coming' },
    { sport: 'Tennis (Men)', place: 'Cricket Ground', time: '10:00 AM', date: '13/05/2022', status: 'On going' },
    { sport: 'Track & Field (Men)', place: 'Cricket Ground', time: '10:00 AM', date: '13/05/2022', status: 'On going' },
    { sport: 'Weight Lifting', place: 'Cricket Ground', time: '10:00 AM', date: '13/05/2022', status: 'Up coming' },
    // other events...
  ]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    setNewEvent({
      sport: '',
      place: '',
      time: '',
      date: '',
      status: 'On going'
    });
  };

  const filteredEvents = events.filter(item => 
    item.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      {/* Staff Mode Toggle */}
      {(userRole === 'staff' || userRole === 'admin') && (
        <div className="mb-5">
          <label className="mr-2">Staff Mode:</label>
          <input
            type="checkbox"
            checked={staffMode}
            onChange={() => setStaffMode(!staffMode)}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {user_type === "staff" && (
          <button
            className="ml-4 bg-yellow-300 text-black py-3 px-4 rounded text-sm hover:bg-yellow-500 w-1/4"
            onClick={handleModalToggle}
          >
            Add Event
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b-2 p-4 text-left bg-gray-100">Sport</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Place</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Time</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Date</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Status</th>
              {user_type === "staff" && (
                <th className="border-b-2 p-4 text-left bg-gray-100">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b p-4">{item.sport}</td>
                <td className="border-b p-4">{item.place}</td>
                <td className="border-b p-4">{item.time}</td>
                <td className="border-b p-4">{item.date}</td>
                <td className={`border-b p-4 ${item.status === 'On going' ? 'text-green-500' : item.status === 'Up coming' ? 'text-orange-500' : 'text-red-500'}`}>
                  {item.status}
                </td>
                {user_type === "staff" && (
                  <td className="border-b p-4">
                    <button className="mr-3">✏️</button>
                    <button className=" ">🗑️</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl mb-4">Add New Event</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Sport:</label>
                <select
                  name="sport"
                  value={newEvent.sport}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a Sport</option>
                  {sportsList.map((sport, index) => (
                    <option key={index} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Place:</label>
                <input
                  type="text"
                  name="place"
                  value={newEvent.place}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time:</label>
                <input
                  type="text"
                  name="time"
                  value={newEvent.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status:</label>
                <select
                  name="status"
                  value={newEvent.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="On going">On going</option>
                  <option value="Up coming">Up coming</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="mr-4 bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
