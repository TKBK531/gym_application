const items = [
  { item: 'Badminton Racket', sport: 'Badminton', count: 12 },
  { item: 'Shuttlecock', sport: 'Badminton', count: 5 },
  { item: 'Basketball', sport: 'Basketball', count: 3 },
  { item: 'Paddle', sport: 'Table Tennis', count: 8 },
  { item: 'Volleyball', sport: 'Volleyball', count: 3 },
];

const ItemTable = () => {
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
          {items.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{item.item}</td>
              <td className="py-2 px-4">{item.sport}</td>
              <td className="py-2 px-4">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
