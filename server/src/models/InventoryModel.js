/**
 * @file Defines the Inventory model.
 * @module models/InventoryModel
 * @author Sayaka Chishiki Jakobsson
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  quantity: {
    type: Number,
    trim: true,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const InventoryModel = mongoose.model('Inventory', schema)