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

  // Filter the items based on the search query
  const filteredItems = items
    .filter(
      (item) =>
        item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sport.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Sort the items based on the sport or count
    .sort((a, b) => {
      if (sortSport) {
        return a.sport.localeCompare(b.sport); // Sort alphabetically by sport
      } else {
        const order = sortCount === "asc" ? 1 : -1; // Ascending or Descending
        return (a.count - b.count) * order;
      }
    });

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
              <td className="py-2 px-4 flex items-center">
                {/* Display + and - icons for staff members only */}
                {isStaff && (
                  <>
                    <button className="mr-2 text-green-500">
                      <FaPlus />
                    </button>
                    <button className="mr-2 text-red-500">
                      <FaMinus />
                    </button>
                  </>
                )}
                {item.item}
              </td>
              <td className="py-2 px-4">{item.sport}</td>
              <td className="py-2 px-4">
                {item.count}
                {/* Display + and - icons for staff members only */}
                {isStaff && (
                  <div className="flex items-center">
                    <button className="ml-2 text-green-500">
                      <FaPlus />
                    </button>
                    <button className="ml-2 text-red-500">
                      <FaMinus />
                    </button>
                  </div>
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
