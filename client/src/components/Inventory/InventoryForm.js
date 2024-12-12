import React, { useState } from 'react';

const InventoryForm = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      name,
      quantity,
      date: date || new Date()
    };

    try {
      await onAddItem(newItem);
      setName('');
      setQuantity('');
      setDate(''); // Clear the date input after submission
    } catch (err) {
      console.error('Error adding inventory item:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Part Name:</label>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">Select Part</option>
          <option value="Part_A">Part_A</option>
          <option value="Part_B">Part_B</option>
          <option value="Part_C">Part_C</option>
          <option value="Part_D">Part_D</option>
          <option value="Part_E">Part_E</option>
        </select>
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Add Inventory</button>
    </form>
  );
};

export default InventoryForm;
