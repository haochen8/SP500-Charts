/**
 * @file API version 1 router.
 * @module routes/router
 * @author Hao Chen
 * @version 1.0.0
 */

import express from 'express'
import { router as companyRouter } from './companyRouter.js'
import { router as stockRouter } from './stockRouter.js'
import { router as indexRouter } from './indexRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this RESTful API!' }))
router.use('/companies', companyRouter)
router.use('/stocks', stockRouter)
router.use('/index', indexRouter)
