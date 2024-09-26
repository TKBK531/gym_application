import React from "react";

const ItemTable = ({
  searchQuery = "",
  sortSport = true,
  sortCount = "asc",
}) => {
  const items = [
    { item: "Badminton Racket", sport: "Badminton", count: 12 },
    { item: "Shuttlecock", sport: "Badminton", count: 5 },
    { item: "Basketball", sport: "Basketball", count: 3 },
    { item: "Paddle", sport: "Table Tennis", count: 8 },
    { item: "Volleyball", sport: "Volleyball", count: 3 },
  ];

  // Fetch items from the backend on component mount
  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const response = await api.get("/items/all-items/");
      if (response.data.status === "success") {
        setItems(response.data.data);
        console.log("Successfully fetched all items", items);
      } else {
        throw new Error("Failed to fetch items");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); // Ensure that loading is turned off whether request is successful or not
    }
  };

  // Filter and sort the items based on search query and sorting conditions
  const filteredItems = items
    .filter(
      (item) =>
        item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sport.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortSport) {
        return a.sport.toString().localeCompare(b.sport.toString()); // Sort alphabetically by sport (assuming sport is an ID here)
      } else {
        const order = sortCount === "asc" ? 1 : -1; // Ascending or Descending
        return (a.count - b.count) * order;
      }
    });

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>Error fetching items: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Item</th>
            <th className="py-2 px-4 border-b text-left">Sport</th>
            <th className="py-2 px-4 border-b text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{item.item_id}</td>
              <td className="py-2 px-4">{item.sport}</td>
              <td className="py-2 px-4">
                {/* Display + and - icons for staff members only in the Count column */}
                {isStaff ? (
                  <div className="flex items-center space-x-4">
                    {" "}
                    {/* Added wider space between buttons */}
                    <button className="text-red-500">
                      <FaMinus />
                    </button>
                    <span>{item.count}</span>{" "}
                    {/* Count displayed between the buttons */}
                    <button className="text-green-500">
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  <span>
                    {item.count}
                  </span> /* Just display count for non-staff */
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
