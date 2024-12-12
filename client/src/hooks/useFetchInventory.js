import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/inventories`);

        const latestInventory = response.data.reduce((acc, item) => {
          if (!acc[item.name] || new Date(item.date) > new Date(acc[item.name].date)) {
            acc[item.name] = item;
          }
          return acc;
        }, {});

        setInventory(Object.values(latestInventory));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInventory();
  }, []);

  return { inventory, error };
};

export default useFetchInventory;
