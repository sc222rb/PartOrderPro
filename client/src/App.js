import React, { useState } from 'react';
import Header from './components/Header/Header';
import PredictionForm from './components/Prediction/PredictionForm';
import PredictionResult from './components/Prediction/PredictionResult';
import InventoryList from './components/Inventory/InventoryList';
import InventoryForm from './components/Inventory/InventoryForm';
import useFetchInventory from './hooks/useFetchInventory';
import axios from 'axios';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const { inventory: fetchedInventory, isLoading, error } = useFetchInventory();
  const [inventory, setInventory] = useState([]);

  const handlePredict = async (name, year, month) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/predict`, {
        params: {
          modelId: process.env.REACT_APP_BIGML_MODEL_ID,
          name,
          year,
          month,
        },
      });
      setPrediction(response.data.predictedStock);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  const handleAddInventoryItem = async (item) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/inventories`, item);
      // Update the inventory list after a new item has been added
      setInventory([...inventory, item]);
    } catch (err) {
      console.error('Error adding inventory item:', err);
    }
  };

  // Use fetchedInventory as the initial state for inventory
  React.useEffect(() => {
    setInventory(fetchedInventory);
  }, [fetchedInventory]);

  return (
    <div>
      <Header />
      <h2>Inventory List</h2>
      {isLoading && <p>Loading inventory...</p>}
      {error && <p style={{ color: 'red' }}>Failed to load inventory data: {error}</p>}
      {<InventoryList items={inventory} />}

      <h2>Stock Prediction</h2>
      <PredictionForm onPredict={handlePredict} />
      <PredictionResult prediction={prediction} />

      <h2>Inventory Management</h2>
      <InventoryForm onAddItem={handleAddInventoryItem} />
    </div>
  );
};

export default App;
