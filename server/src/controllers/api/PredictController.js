/**
 * @file Defines the Predict Controller class.
 * @module PredictController
 * @author Sayaka Chishiki Jakobsson
 */

import { getPrediction } from '../../services/bigml.js'

/**
 * Encapsulates a controller.
 */
export class PredictController {
  /**
   * Predicts the stock for a given model with multiple input fields.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - A promise that resolves when the prediction is complete.
   */
  async predictStock (req, res) {
    const { modelId, name, year, month } = req.query // Get model ID, month, year, and name from query parameters

    // Validate the required fields
    if (!modelId || !name || !month || !year) {
      return res.status(400).json({ error: 'Model ID, month, year, and name are required.' })
    }

    // Validate `name`
    const validNames = ['Part_A', 'Part_B', 'Part_C', 'Part_D', 'Part_E']
    if (!validNames.includes(name)) {
      return res.status(400).json({ error: `Invalid name. Allowed values are: ${validNames.join(', ')}` })
    }

    // Validate `month`
    const monthInt = parseInt(month, 10)
    if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
      return res.status(400).json({ error: 'Invalid month. It should be an integer between 1 and 12.' })
    }

    // Validate `year`
    const yearInt = parseInt(year, 10)
    if (isNaN(yearInt) || yearInt < 2015 || yearInt > 2029) {
      return res.status(400).json({ error: 'Invalid year. It should be an integer between 2015 and 2029.' })
    }

    // Prepare the input data based on the query parameters
    const inputData = {
      name, // The name of the item, such as product or stock name
      'date.year': parseInt(year, 10), // The year
      'date.month': parseInt(month, 10) // The month
    }

    try {
      // Get prediction from BigML using the model ID and the input data
      const prediction = await getPrediction(modelId, inputData)

      // Assuming 'output' is the key containing the prediction data
      if (prediction && prediction.output) {
        res.json({ predictedStock: prediction.output }) // Send the prediction output in the response
      } else {
        res.status(500).json({ error: 'Invalid prediction response format.' })
      }
    } catch (error) {
      console.error('Error getting prediction:', error)
      res.status(500).json({ error: 'Failed to get prediction.' })
    }
  }
}
