/**
 * @file API version 1 router.
 * @module routes/router
 * @author Sayaka Chishiki Jakobsson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
