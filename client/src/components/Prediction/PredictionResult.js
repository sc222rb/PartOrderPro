import React from 'react';

const PredictionResult = ({ prediction }) => {
  return (
    <div>
      <h2>Prediction Result</h2>
      {prediction ? <p>Predicted Stock: {prediction}</p> : <p>No prediction yet.</p>}
    </div>
  );
};

export default PredictionResult;
