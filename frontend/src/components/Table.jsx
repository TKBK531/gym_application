import { useState } from 'react';

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const data = [
    { sport: '#20462', place: 'Hat', customer: 'Matt Dickerson', date: '13/05/2022', amount: '$4.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
    { sport: '#18933', place: 'Laptop', customer: 'Wiktoria', date: '22/05/2022', amount: '$8.95', paymentMode: 'Cash on Delivery', status: 'Delivered' },
    { sport: '#45169', place: 'Phone', customer: 'Trixie Byrd', date: '15/06/2022', amount: '$1,149.95', paymentMode: 'Cash on Delivery', status: 'Process' },
    { sport: '#34304', place: 'Bag', customer: 'Brad Mason', date: '06/09/2022', amount: '$899.95', paymentMode: 'Transfer Bank', status: 'Process' },
    { sport: '#17188', place: 'Headset', customer: 'Sanderson', date: '25/09/2022', amount: '$22.95', paymentMode: 'Cash on Delivery', status: 'Canceled' },
    { sport: '#73003', place: 'Mouse', customer: 'Jun Redfern', date: '04/10/2022', amount: '$54.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
    { sport: '#58825', place: 'Clock', customer: 'Miriam Kidd', date: '17/10/2022', amount: '$174.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
    { sport: '#44122', place: 'T-shirt', customer: 'Dominic', date: '24/10/2022', amount: '$249.95', paymentMode: 'Cash on Delivery', status: 'Delivered' },
    { sport: '#89094', place: 'Monitor', customer: 'Shanice', date: '01/11/2022', amount: '$899.95', paymentMode: 'Transfer Bank', status: 'Canceled' },
    { sport: '#85252', place: 'Keyboard', customer: 'Poppy-Rose', date: '22/11/2022', amount: '$6.948', paymentMode: 'Transfer Bank', status: 'Process' },
  ];

  const filteredData = data.filter(item => 
    item.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-4 bg-yellow-300 text-black py-3 px-4 rounded text-sm hover:bg-yellow-500 w-1/4">Add Event</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b-2 p-4 text-left bg-gray-100">Sport</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Place</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Customer</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Date</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Amount</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Payment Mode</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Status</th>
              <th className="border-b-2 p-4 text-left bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b p-4">{item.sport}</td>
                <td className="border-b p-4">{item.place}</td>
                <td className="border-b p-4">{item.customer}</td>
                <td className="border-b p-4">{item.date}</td>
                <td className="border-b p-4">{item.amount}</td>
                <td className="border-b p-4">{item.paymentMode}</td>
                <td className={`border-b p-4 ${item.status.toLowerCase() === 'delivered' ? 'text-green-500' : item.status.toLowerCase() === 'process' ? 'text-orange-500' : 'text-red-500'}`}>{item.status}</td>
                <td className="border-b p-4">
                  <button className="mr-3">✏️</button>
                  <button className=" ">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
