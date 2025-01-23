import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../api';
import { toast } from "react-toastify";

const Table = ({ userRole, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staffMode, setStaffMode] = useState(userRole === 'staff' || userRole === 'admin');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    sport: '',
    eventName: '',
    place: '',
    time: '',
    date: '',
    status: 'On going',
    category: selectedCategory,
  });
  const [events, setEvents] = useState([]);
  const [eventToDelete, setEventToDelete] = useState(null); 
  const [sportsList, setSportsList] = useState([]); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const user_type = userData.profile.user_type;

  const placesList = ['Gymnasium', 'Ground', 'Pool'];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchEvents();
    fetchSports();
  }, [selectedCategory]);

  const fetchEvents = async () => {
    let endpoint = '';
    switch (selectedCategory) {
      case 'Sports':
        endpoint = '/event/list-sport-events/';
        break;
      case 'Musical Shows':
        endpoint = '/event/list-musical-show-events/';
        break;
      case 'Other Functions':
        endpoint = '/event/list-other-function-events/';
        break;
      default:
        endpoint = '/event/list-events/';
        break;
    }

    try {
      const response = await api.get(endpoint);
      if (response.data.status === 'success') {
        const sortedEvents = response.data.data.sort((a, b) => new Date(a.event.date) - new Date(b.event.date));
        setEvents(sortedEvents);
      }
      console.log('Events:', response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  const fetchSports = async () => {
    try {
      const response = await api.get('/sport/all-sports/');
      if (response.data.status === 'success') {
        setSportsList(response.data.data);
      }
      console.log('Sports:', response.data.data);
    } catch (error) {
      console.error('Error fetching sports:', error.message);
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let requestBody = {
      event_type: selectedCategory.toLowerCase().replace(' ', '_'),
      event: {
        event: {
          name: newEvent.eventName, 
          place: newEvent.place,
          time: newEvent.time,
          date: newEvent.date,
          status: newEvent.status.toLowerCase().replace(' ', '_')
        }
      }
    };

    if (selectedCategory === 'Sports') {
      const selectedSport = sportsList.find(sport => sport.label === newEvent.sport);
      requestBody.event.sport = selectedSport ? selectedSport.id : null;
    }

    console.log(JSON.stringify(requestBody, null, 2));

    try {
      const response = await api.post('/event/create-event/', requestBody);
      if (response.data.status === 'success') {
        fetchEvents();
        setIsModalOpen(false);
        setNewEvent({
          sport: '',
          eventName: '',
          place: '',
          time: '',
          date: '',
          status: 'On going',
          category: selectedCategory,
        });
        toast.success('Event created successfully');
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
      toast.error('Error creating event');
    }
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/event/delete-event/${eventToDelete.event.id}/`);
      if (response.data.status === 'success') {
        fetchEvents(); 
        setEventToDelete(null);
        toast.success('Event deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting event:', error.message);
      toast.error('Error deleting event');
    }
  };

  const filteredEvents = events.filter(
    item =>
      item.event.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.event.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.event.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColumnName = (category) => {
    switch (category) {
      case 'Sports':
        return 'Sport';
      case 'Musical Shows':
        return 'Musical Show';
      case 'Other Functions':
        return 'Function';
      default:
        return 'Event';
    }
  };

  const getEventLabel = (category) => {
    switch (category) {
      case 'Sports':
        return 'Sport';
      case 'Musical Shows':
        return 'Musical Show';
      case 'Other Functions':
        return 'Function';
      default:
        return 'Event';
    }
  };

  const getEventInput = (category) => {
    if (category === 'Sports') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={newEvent.eventName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
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
                <option key={index} value={sport.label}>
                  {sport.label}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    } else {
      return (
        <input
          type="text"
          name="eventName"
          value={newEvent.eventName}
          onChange={handleChange}
          placeholder={`Enter ${getEventLabel(category)}`}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      );
    }
  };

  const getRowClass = (eventType) => {
    switch (eventType) {
      case 'sport':
        return 'bg-blue-100';
      case 'musical_show':
        return 'bg-green-100';
      case 'other_function':
        return 'bg-yellow-100';
      default:
        return '';
    }
  };

  const getSportLabel = (sportId) => {
    const sport = sportsList.find(sport => sport.id === sportId);
    return sport ? sport.label : 'Unknown Sport';
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEventToEdit({ ...eventToEdit, event: { ...eventToEdit.event, [name]: value } });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/event/update-event/${eventToEdit.event.id}/`, eventToEdit);
      if (response.data.status === 'success') {
        fetchEvents(); 
        setIsEditModalOpen(false);
        setEventToEdit(null);
        toast.success('Event updated successfully');
      }
    } catch (error) {
      console.error('Error updating event:', error.message);
      toast.error('Error updating event');
    }
  };

  return (
    <div className="p-5">
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
        {(user_type === "staff" || user_type === "admin") && (
          <button
            className="ml-4 bg-yellow-300 text-black py-3 px-4 rounded text-sm hover:bg-yellow-500 w-1/4"
            onClick={handleModalToggle}
          >
            Add Event
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {selectedCategory === 'Sports' && (
                <>
                  <th className="border-b-2 p-4 text-left bg-gray-100">Event Name</th>
                  <th className="border-b-2 p-4 text-left bg-gray-100">Sport</th>
                </>
              )}
              {selectedCategory !== 'Sports' && (
                <th className="border-b-2 p-4 text-left bg-gray-100">{getColumnName(selectedCategory)}</th>
              )}
              <th className="border-b-2 p-4 text-left bg-gray-100">Place</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Time</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Date</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Status</th>
              {(user_type === "staff" || user_type === "admin") && (
                <th className="border-b-2 p-4 text-left bg-gray-100">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${getRowClass(item.event.event_type)}`}>
                {selectedCategory === 'Sports' && (
                  <>
                    <td className="border-b p-4">{item.event.name}</td>
                    <td className="border-b p-4">{getSportLabel(item.sport)}</td>
                  </>
                )}

                {selectedCategory !== 'Sports' && (
                  <td className="border-b p-4">{item.event.name}</td>
                )}
                <td className="border-b p-4">{capitalizeFirstLetter(item.event.place)}</td>
                <td className="border-b p-4">{item.event.time}</td>
                <td className="border-b p-4">{item.event.date}</td>
                <td className={`border-b p-4 ${item.event.status === 'On going' ? 'text-green-500' : item.event.status === 'Up coming' ? 'text-orange-500' : 'text-red-500'}`}>
                  {item.event.status}
                </td>
                {(user_type === "staff" || user_type === "admin") && (
                  <td className="border-b p-4 text-center">
                    <button className="delete-btn text-red-600 hover:text-red-700" onClick={() => handleDeleteClick(item)}><FaTrash /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl mb-4">Add New {getEventLabel(selectedCategory)}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                {/* <label className="block text-gray-700">{getEventLabel(selectedCategory)}:</label> */}
                {getEventInput(selectedCategory)}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Place:</label>
                <select
                  name="place"
                  value={newEvent.place}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a Place</option>
                  {placesList.map((place, index) => (
                    <option key={index} value={place.toLowerCase()}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time:</label>
                <input
                  type="time"
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
                  <option value="ongoing">On going</option>
                  <option value="upcoming">Up coming</option>
                  <option value="postponed">Postponed</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-4"
                  onClick={handleModalToggle}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black py-2 px-4 rounded"
                >
                  Save {getEventLabel(selectedCategory)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl mb-4">Edit Event</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Event Name:</label>
                <input
                  type="text"
                  name="name"
                  value={eventToEdit.event.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Place:</label>
                <select
                  name="place"
                  value={eventToEdit.event.place}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a Place</option>
                  {placesList.map((place, index) => (
                    <option key={index} value={place.toLowerCase()}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time:</label>
                <input
                  type="time"
                  name="time"
                  value={eventToEdit.event.time}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={eventToEdit.event.date}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status:</label>
                <select
                  name="status"
                  value={eventToEdit.event.status}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="ongoing">On going</option>
                  <option value="upcoming">Up coming</option>
                  <option value="postponed">Postponed</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-4"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {eventToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the event <strong>{eventToDelete.event.name}</strong>?</p>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={() => setEventToDelete(null)}>Cancel</button>
              <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  userRole: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default Table;
