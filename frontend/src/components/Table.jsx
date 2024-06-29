import React, { useState } from 'react';
import './table.css';

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const data = [
    { sport: '#20462', product: 'Hat', customer: 'Matt Dickerson', date: '13/05/2022', amount: '$4.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
    { sport: '#18933', product: 'Laptop', customer: 'Wiktoria', date: '22/05/2022', amount: '$8.95', paymentMode: 'Cash on Delivery', status: 'Delivered' },
    { sport: '#45169', product: 'Phone', customer: 'Trixie Byrd', date: '15/06/2022', amount: '$1,149.95', paymentMode: 'Cash on Delivery', status: 'Process' },
    { sport: '#34304', product: 'Bag', customer: 'Brad Mason', date: '06/09/2022', amount: '$899.95', paymentMode: 'Transfer Bank', status: 'Process' },
    { sport: '#17188', product: 'Headset', customer: 'Sanderson', date: '25/09/2022', amount: '$22.95', paymentMode: 'Cash on Delivery', status: 'Canceled' },
    { sport: '#73003', product: 'Mouse', customer: 'Jun Redfern', date: '04/10/2022', amount: '$54.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
    { sport: '#58825', product: 'Clock', customer: 'Miriam Kidd', date: '17/10/2022', amount: '$174.95', paymentMode: 'Transfer Bank', status: 'Delivered' },
    { sport: '#44122', product: 'T-shirt', customer: 'Dominic', date: '24/10/2022', amount: '$249.95', paymentMode: 'Cash on Delivery', status: 'Delivered' },
    { sport: '#89094', product: 'Monitor', customer: 'Shanice', date: '01/11/2022', amount: '$899.95', paymentMode: 'Transfer Bank', status: 'Canceled' },
    { sport: '#85252', product: 'Keyboard', customer: 'Poppy-Rose', date: '22/11/2022', amount: '$6.948', paymentMode: 'Transfer Bank', status: 'Process' },
  ];

  const filteredData = data.filter(item => 
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className="table-header">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-customer-button">Add Customer</button>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sport</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.sport}</td>
              <td>{item.product}</td>
              <td>{item.customer}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.paymentMode}</td>
              <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
              <td>
                <button className="edit-button">✏️</button>
                <button className="delete-button">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
