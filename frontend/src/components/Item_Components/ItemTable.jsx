import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import api from "../../api";
import { toast } from "react-toastify";
const ItemTable = ({
  searchQuery = "",
  sortSport = 0,
  sortCount = "asc",
  isStaffOrAdmin,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const isUserStaffOrAdmin =
    isStaffOrAdmin ||
    userData?.profile?.user_type === "admin" ||
    userData?.profile?.user_type === "staff";

  useEffect(() => {
    fetchAllItems();
  }, []);

  const onMinusButtonClick = async(id)=> {
    const response = await api.patch(`/items/equipment/${id}/decrease/`,);
    if (response.data?.status === "success") {
      fetchAllItems();
    } else {
      throw new Error(response.data?.message || "Failed to decrease count");
    }
  };

  const onPlusButtonClick = async(id)=> {
    const response = await api.patch(`/items/equipment/${id}/increase/`,);
    if (response.data?.status === "success") {
      fetchAllItems();
    } else {
      throw new Error(response.data?.message || "Failed to increase count");
    }
  };

  const fetchAllItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/items/equipment/");
      if (response.data?.status === "success") {
        setItems(response.data.data || []);
      } else {
        throw new Error(response.data?.message || "Failed to fetch items");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await api.delete(`/items/equipment/delete/${id}/`);
      if (response.data?.status === "success") {
        fetchAllItems();
      } else {
        
        throw new Error(response.data?.message || "Failed to delete item");
      }
    } catch (err) {
      window.location.reload();
      toast.success("Item deleted successfully");
      console.error("Error deleting item:", err.message);
    }
  };

  const filteredItems = items
    .filter((item) =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortSport) {
        return a.sport - b.sport;
      } else {
        const order = sortCount === "asc" ? 1 : -1;
        return (a.count - b.count) * order;
      }
    });

  if (loading) {
    return <p>Loading items...</p>;
  }

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

  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center font-bold">Item</th>
            <th className="py-2 px-4 border-b text-center font-bold">Sport</th>
            <th className="py-2 px-4 border-b text-center font-bold">Count</th>
          {isUserStaffOrAdmin && (
            <th className="py-2 px-4 border-b text-center font-bold">Actions</th>
          )}
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-left">{item.item}</td>
                <td className="py-2 px-4 text-center">{item.sport_label}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center justify-center space-x-4">
                    {isUserStaffOrAdmin ? (
                      <>
                        <button className="text-red-500" onClick={() => onMinusButtonClick(item.id)}>
                          <FaMinus />
                        </button>
                        <span>{item.count}</span>
                        <button className="text-green-500" onClick={() => onPlusButtonClick(item.id)}>
                          <FaPlus />
                        </button>
                      </>
                    ) : (
                      <span>{item.count}</span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 text-center">
                  {isUserStaffOrAdmin && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
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
