/**
 * @file Defines the Inventory Controller class.
 * @module InventoryController
 * @author Sayaka Chishiki Jakobsson
 */

import { InventoryModel } from '../../models/InventoryModel.js'

/**
 * Encapsulates a controller.
 */
export class InventoryController {
  /**
   * Loads a hive document and attaches it to the request object.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The ID of the hive document to load.
   * @returns {Promise<void>} - Promise that resolves when the hive document is loaded and attached to the request object.
   */
  async loadDocument (req, res, next, id) {
    try {
      // Get the status document.
      const inventory = await InventoryModel.findById(id)
      if (!inventory) {
        // If no document is found, return a 404 status with a message.
        return next(createError(404))
      }

      req.inventory = inventory
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a inventory.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.inventory)
  }

  /**
   * Sends a JSON response containing all inventories.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const inventories = await InventoryModel.find()

      res.json(inventories)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new inventory.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const inventory = new InventoryModel({
        name: req.body.name,
        quantity: req.body.quantity
      })

      await inventory.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${inventory._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(inventory)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates a specific inventory.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      const { name, quantity } = req.body

      if (name === undefined || quantity === undefined) {
        next(createError(400))
        return
      }

      req.inventory.name = name
      req.inventory.quantity = quantity

      await req.inventory.save()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified inventory.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await req.inventory.deleteOne()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
