import axios from 'axios'

/**
 * Get a prediction from BigML
 *
 * @param {object} modelId The model ID from BigML.
 * @param {object} inputData The input data for the prediction.
 * @returns {Promise<object>} The prediction result from BigML
 */
async function getPrediction (modelId, inputData) {
  try {
    const BIGML_AUTH = `username=${process.env.BIGML_USERNAME}&api_key=${process.env.BIGML_API_KEY}`
    const response = await axios.post(
      `https://bigml.io/andromeda/prediction?${BIGML_AUTH}`,
      { model: modelId, input_data: inputData },
      {
        headers: {
          Authorization: `Bearer ${BIGML_AUTH}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error getting prediction from BigML:', error)
    throw error
  }
}

export { getPrediction }
