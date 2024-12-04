/**
 * @file Defines the base schema.
 * @module baseSchema
 * @author Sayaka Chishiki Jakobsson
 */

import mongoose from 'mongoose'

// Options to use converting the document to a plain object and JSON.
const convertOptions = Object.freeze({
  getters: true, // Include getters and virtual properties.
  versionKey: false, // Exclude the __v property.
  /**
   * Transforms the document, removing the _id property.
   *
   * @param {object} doc - The mongoose document which is being converted.
   * @param {object} ret - The plain object representation which has been converted.
   * @returns {object} The transformed object.
   * @see https://mongoosejs.com/docs/api.html#document_Document-toObject
   */
  transform: (doc, ret) => {
    delete ret._id // Exclude the _id property.
    return ret
  }
})

// Create a schema.
const baseSchema = new mongoose.Schema({}, {
  // Add and maintain createdAt and updatedAt fields.
  timestamps: true,
  // Set the options to use when converting the document to a POJO (or DTO) or JSON.
  // POJO = Plain Old JavaScript Object
  // DTO = Data Transfer Object
  toObject: convertOptions,
  toJSON: convertOptions,
  // Enable optimistic concurrency control. This is a strategy to ensure the
  // document you're updating didn't change between when you loaded it, and
  // when you update it.
  optimisticConcurrency: false
})

export const BASE_SCHEMA = Object.freeze(baseSchema)
