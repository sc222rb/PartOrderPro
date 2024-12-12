import { useState } from 'react';

const useErrorHandling = () => {
  const [error, setError] = useState(null);

  const handleApiCall = async (apiCall) => {
    try {
      const response = await apiCall();
      setError(null); // エラーをリセット
      return response;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('API call error:', err);
      return null; // エラー時はnullを返す
    }
  };

  return {
    error,
    handleApiCall,
  };
};

export default useErrorHandling;
