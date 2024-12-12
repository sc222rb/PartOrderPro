import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import PredictionForm from './components/Prediction/PredictionForm';
import PredictionResult from './components/Prediction/PredictionResult';
import InventoryList from './components/Inventory/InventoryList';
import InventoryForm from './components/Inventory/InventoryForm';
import useFetchInventory from './hooks/useFetchInventory';
import useErrorHandling from './hooks/useErrorHandling';
import axios from 'axios';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [inventory, setInventory] = useState([]);
  const { inventory: fetchedInventory, isLoading, error } = useFetchInventory();
  
  const { error: predictionError, handleApiCall: handlePredictionCall } = useErrorHandling();
  const { error: inventoryError, handleApiCall: handleInventoryCall } = useErrorHandling();

  useEffect(() => {
    setInventory(fetchedInventory);
  }, [fetchedInventory]);

  const handlePredict = async (name, year, month) => {
    const response = await handlePredictionCall(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/predict`, {
        params: {
          modelId: process.env.REACT_APP_BIGML_MODEL_ID,
          name,
          year,
          month,
        },
      })
    );
    if (response) {
      setPrediction(response.data.predictedStock);
    }
  };

  const handleAddInventoryItem = async (item) => {
    const response = await handleInventoryCall(() =>
      axios.post(`${process.env.REACT_APP_API_URL}/inventories`, item)
    );
    if (response) {
      setInventory([...inventory, item]);
    }
  };

  return (
    <div>
      <Header />
      
      {/* Inventory List */}
      <h2>Inventory List</h2>
      {isLoading && <p>Loading inventory...</p>}
      {error && <p style={{ color: 'red' }}>Failed to load inventory data: {error}</p>}
      <InventoryList items={inventory} />
      
      {/* Stock Prediction */}
      <h2>Stock Prediction</h2>
      {predictionError && <p style={{ color: 'red' }}>{predictionError}</p>}
      <PredictionForm onPredict={handlePredict} />
      <PredictionResult prediction={prediction} />

      {/* Inventory Management */}
      <h2>Inventory Management</h2>
      {inventoryError && <p style={{ color: 'red' }}>{inventoryError}</p>}
      <InventoryForm onAddItem={handleAddInventoryItem} />
    </div>
  );
};

export default App;
