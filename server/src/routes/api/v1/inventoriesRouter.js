/**
 * @file Defines the inventory router.
 * @module routes/inventoriesRouter
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'
import { InventoryController } from '../../../controllers/api/InventoryController.js'

export const router = express.Router()

const controller = new InventoryController()

// Map HTTP verbs and route paths to controller actions.
router.param('id', (req, res, next, id) => controller.loadDocument(req, res, next, id))

router.get('/',
  (req, res, next) => controller.findAll(req, res, next)
)

router.get('/:id',
  (req, res, next) => controller.find(req, res, next)
)

router.post('/',
  (req, res, next) => controller.create(req, res, next)
)

router.put('/:id',
  (req, res, next) => controller.update(req, res, next)
)

router.delete('/:id',
  (req, res, next) => controller.delete(req, res, next)
)
