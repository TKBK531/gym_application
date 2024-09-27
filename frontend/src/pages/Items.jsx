import { useState } from "react";
import ItemTable from "../components/Item_Components/ItemTable";
import ItemImage from "../assets/itemPage/Item1.jpg";
import api from "../api";
const Items = () => {
  const [activeTab, setActiveTab] = useState("Indoor");
  const [searchQuery, setSearchQuery] = useState(""); // Handle search input
  const [sortSport, setSortSport] = useState(true); // Sort by sport or not
  const [sortCount, setSortCount] = useState("asc"); // Sort count in 'asc' or 'desc'
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [newItem, setNewItem] = useState({
    item_id: "",
    sport: "",
    count: 0,
    item_type: 1,
  }); // New item form state

  const sportsOptions = [
    "Baseball",
    "Carrom",
    "Football",
    "Netball",
    "Wrestling",
    "Cricket",
  ]; // Add specific sports here
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortSportChange = () => setSortSport(!sortSport); // Toggle sorting by sport
  const handleSortCountChange = (e) => setSortCount(e.target.value); // Set 'asc' or 'desc'

  const handleAddItemClick = () => setShowModal(true); // Show the modal when 'Add Item' is clicked

  const handleCloseModal = () => setShowModal(false); // Close modal handler

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("New item details:", newItem);
    const response = await api.post("/items/add/");

    console.log(response);

    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">
          Hello, {userData.user.first_name} {userData.user.last_name}👋{" "}
        </h1>
        <div className="relative">
          <img
            src={ItemImage}
            alt="Equipment Banner"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
            <h1 className="text-white text-3xl font-bold">Equipment</h1>
          </div>
        </div>
      </div>

      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "Indoor" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Indoor")}
        >
          Indoor
        </button>
        <button
          className={`px-4 py-2 ml-2 ${
            activeTab === "Outdoor" ? "bg-gray-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Outdoor")}
        >
          Outdoor
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {" "}
          {/* Flex container for inline elements */}
          <input
            type="text"
            className="border p-2 rounded max-w-xs"
            placeholder="Search"
            value={searchQuery} // Controlled component for search query
            onChange={handleSearchChange}
          />
          {/* Add Item Button */}
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={handleAddItemClick} // Show modal on click
          >
            Add Item
          </button>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <button
            className={`px-4 py-2 ${
              sortSport ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
            onClick={handleSortSportChange}
          >
            Sport
          </button>
          <select
            className="ml-2 border p-2 rounded"
            value={sortCount} // Controlled component for sorting count
            onChange={handleSortCountChange}
          >
            <option value="asc">Count Ascending</option>
            <option value="desc">Count Descending</option>
          </select>
        </div>
      </div>

      {/* Pass search and sort states as props */}
      <ItemTable
        searchQuery={searchQuery}
        sortSport={sortSport}
        sortCount={sortCount}
      />

      {/* Modal for adding a new item */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4">Add New Item</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Item Type</label>
                <input
                  type="text"
                  name="itemType"
                  value={newItem.itemType}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Sport</label>
                <select
                  name="sport"
                  value={newItem.sport}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Sport</option>
                  {sportsOptions.map((sport, index) => (
                    <option key={index} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Count</label>
                <input
                  type="number"
                  name="count"
                  value={newItem.count}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleCloseModal} // Close the modal on click
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
