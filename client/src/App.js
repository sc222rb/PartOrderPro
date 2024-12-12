import React, { useState } from 'react';
import Header from './components/Header/Header';
import PredictionForm from './components/Prediction/PredictionForm';
import PredictionResult from './components/Prediction/PredictionResult';
import InventoryList from './components/Inventory/InventoryList';
import useFetchInventory from './hooks/useFetchInventory';
import axios from 'axios';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const { inventory, isLoading, error } = useFetchInventory();

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
    </div>
  );
};

export default App;
