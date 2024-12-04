import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [inventory, setInventory] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/inventories`)
            .then((response) => setInventory(response.data))
            .catch((error) => console.error(error));
    }, []);

  return (
    <div>
        <h1>PartOrderPro Dashboard</h1>
        <ul>
            {inventory.map(item => (
                <li key={item._id}>
                    {item.name}: {item.quantity}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default App;


