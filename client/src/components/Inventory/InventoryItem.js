import React from 'react';

const InventoryItem = ({ name, quantity, data }) => {
  return (
    <li>
      {name}: {quantity}: {data}
    </li>
  );
};

export default InventoryItem;
