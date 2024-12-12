import React from 'react';

const InventoryList = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>No inventory available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Part Name</th>
          <th>Quantity</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.date ? new Date(item.date).toLocaleDateString('en-US') : 'No Date'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryList;
