import { useState } from "react";
import ItemTable from "../components/Item_Components/ItemTable";
import ItemImage from "../assets/itemPage/Item1.jpg";

const Items = () => {
  const [activeTab, setActiveTab] = useState("Indoor");
  const [searchQuery, setSearchQuery] = useState(""); // This will handle the search input
  const [sortSport, setSortSport] = useState(true); // Sort by sport or not
  const [sortCount, setSortCount] = useState("asc"); // Sort count in 'asc' or 'desc'

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
        <div className="text-xl mb-2">
          <span>Hello, Hasaranga Abeywickrama 👋</span>
        </div>
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
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-xs"
          placeholder="Search"
          value={searchQuery} // Controlled component for search query
          onChange={handleSearchChange}
        />
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <button
            className={`px-4 py-2 ${
              sortSport ? "bg-blue-500 text-white" : "bg-gray-200"
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
    </div>
  );
};

export default Items;
