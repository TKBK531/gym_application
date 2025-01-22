import { useState } from "react";
import ItemTable from "../components/Item_Components/ItemTable";
import api from "../api";
import Slider from "@/components/Item_Components/slider";

const Items = () => {
  const [activeTab, setActiveTab] = useState("Indoor");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortSport, setSortSport] = useState(true);
  const [sortCount, setSortCount] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    item: "",
    sport: "",
    count: 0,
  });

  const sportsOptions = [
    { id: 1, name: "Baseball" },
    { id: 2, name: "Basketball" },
    { id: 3, name: "Football" },
    { id: 4, name: "Netball" },
    { id: 5, name: "Wrestling" },
    { id: 6, name: "Cricket" },
  ];

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortSportChange = () => setSortSport(!sortSport);
  const handleSortCountChange = (e) => setSortCount(e.target.value);

  const handleAddItemClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      item: newItem.item,
      sport: parseInt(newItem.sport, 10),
      count: parseInt(newItem.count, 10),
    };

    console.log("Input Data in JSON Format:", JSON.stringify(payload, null, 2));

    try {
      const response = await api.post("/items/equipment/add/", payload);
      console.log("Response from server:", response.data);

      setShowModal(false);
      setNewItem({ item: "", sport: "", count: 0 });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">
          Hello, {userData?.user?.first_name} {userData?.user?.last_name}👋{" "}
        </h1>

        <div id="default-carousel" className="relative w-full" data-carousel="slide">
          <div className="relative h-40 sm:h-56 md:h-80 lg:h-96 overflow-hidden rounded-lg">
            <div>
              <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4"></h1>
              <Slider />
            </div>
          </div>
        </div>
      </div>

      <section>

        <div className="flex justify-center bg-blue-100 flex-wrap mb-4">
          <h4 className="text-lg sm:text-xl md:text-xl lg:text-xl font-bold text-center">Indoor & Outdoor Equipment</h4>
          {/* <button
          className={`px-4 py-2 ${
            activeTab === "Indoor"
              ? "bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("Indoor")}
        >
          Indoor & Outdoor
        </button> */}
        </div>
      </section>

      <div className="flex flex-wrap justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            className="border p-2 rounded w-full sm:w-auto"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full sm:w-auto"
            onClick={handleAddItemClick}
          >
            Add Item
          </button>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm sm:text-base">Sort by:</span>
          <select
            className="border p-2 rounded"
            value={sortCount}
            onChange={handleSortCountChange}
          >
            <option value="asc">Count Ascending</option>
            <option value="desc">Count Descending</option>
          </select>
        </div>
      </div>

      <ItemTable searchQuery={searchQuery} sortSport={sortSport} sortCount={sortCount} />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full sm:w-96">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Add New Item</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm sm:text-base">Item</label>
                <input
                  type="text"
                  name="item"
                  value={newItem.item}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm sm:text-base">Sport</label>
                <select
                  name="sport"
                  value={newItem.sport}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Sport</option>
                  {sportsOptions.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm sm:text-base">Count</label>
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
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                  onClick={handleCloseModal}
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
