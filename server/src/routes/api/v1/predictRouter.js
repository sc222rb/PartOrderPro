/**
 * @file Defines the prediction router.
 * @module routes/predictionsRouter
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'
import { PredictController } from '../../../controllers/api/PredictController.js'

export const router = express.Router()

const controller = new PredictController()

router.get('/',
  (req, res, next) => controller.predictStock(req, res, next)
)
