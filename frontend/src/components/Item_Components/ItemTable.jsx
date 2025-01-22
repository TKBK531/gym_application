import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import FontAwesome icons
import api from "../../api"; // Assuming you have a properly configured Axios instance here

const ItemTable = ({
  searchQuery = "",
  sortSport = 0,
  sortCount = "asc",
  isStaffOrAdmin,
}) => {
  const [items, setItems] = useState([]); // State to store the fetched items
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  const userData = JSON.parse(localStorage.getItem("userData")); // Fetch user data from localStorage

  const isUserStaffOrAdmin = isStaffOrAdmin || userData?.profile?.user_type === "admin" || userData?.profile?.user_type === "staff";

  // Fetch items from the backend on component mount
  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    setLoading(true); // Reset loading state
    setError(null); // Clear any previous errors
    try {
      const response = await api.get("/items/equipment/");
      if (response.data?.status === "success") {
        setItems(response.data.data || []); // Set items or fallback to an empty array
        console.log("Successfully fetched all items", response.data.data);
      } else {
        throw new Error(response.data?.message || "Failed to fetch items");
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(err.response?.data?.message || err.message || "An unknown error occurred");
    } finally {
      setLoading(false); // Ensure loading is turned off
    }
  };

  // Filter and sort the items based on search query and sorting conditions
  const filteredItems = items
    .filter((item) =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) // Use `item` for search
    )
    .sort((a, b) => {
      if (sortSport) {
        return a.sport - b.sport; // Sort by `sport` (numerical comparison)
      } else {
        const order = sortCount === "asc" ? 1 : -1; // Ascending or Descending
        return (a.count - b.count) * order; // Sort by `count`
      }
    });

  // Handle loading state
  if (loading) {
    return <p>Loading items...</p>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error fetching items: {error}</p>
        <button
          onClick={fetchAllItems}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render the table
  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Item</th>
            <th className="py-2 px-4 border-b text-center">Sport</th>
            <th className="py-2 px-4 border-b text-center">Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{item.item}</td>
                <td className="py-2 px-4 text-center">{item.sport}</td>
                <td className="py-2 px-4">
                  {isUserStaffOrAdmin ? (
                    <div className="flex items-center justify-center space-x-4">
                      <button className="text-red-500">
                        <FaMinus />
                      </button>
                      <span>{item.count}</span>
                      <button className="text-green-500">
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <span>{item.count}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

ItemTable.propTypes = {
  searchQuery: PropTypes.string,
  sortSport: PropTypes.number,
  sortCount: PropTypes.string,
  isStaffOrAdmin: PropTypes.bool,
};

export default ItemTable;
