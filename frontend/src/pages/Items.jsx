import { useState, useEffect, useRef } from "react";
import ItemTable from "../components/Item_Components/ItemTable";
import api from "../api";
import Slider from "@/components/Item_Components/slider";
import { toast } from "react-toastify";
const Items = () => {
  const [allSports, setAllSports] = useState([]);
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortSport] = useState(true);
  const [sortCount] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    item: "",
    sport: "",
    count: 0,
  });

   const initialFetchComplete = useRef(false);

   useEffect(() => {
       fetchAllSports();
     }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isStaffOrAdmin =
  userData?.profile?.user_type === "admin" || userData?.profile?.user_type === "staff";

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

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
      toast.success("Item added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error("Failed to add item");
    }
  };

  const fetchAllSports = async () => {
    try {
      const response = await api.get("/sport/all-sports/");
      if (response.data.status === "success") {
        setAllSports(response.data.data);
        initialFetchComplete.current = true;
        getLoggedInUserType();
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const getLoggedInUserType = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const userType = storedUser.profile.user_type;
    console.log("Stored user:", storedUser);
    setLoggedInUserType(userType);
    return userType;
  };

  

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        {console.log(isStaffOrAdmin)}
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
        <div className="flex justify-center flex-wrap mb-4">
          <h4 className="text sm:text-xl md:text-xl lg:text-xl font-bold text-center">
            Indoor & Outdoor Equipment
          </h4>
        </div>
      </section>

      <div className="mb-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            className="border p-2 rounded w-full sm:w-full"
            placeholder="Search Items"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {isStaffOrAdmin && (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full sm:w-1/4"
              onClick={handleAddItemClick}
            >
              Add Item
            </button>
          )}
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
                  {allSports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.label}
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
