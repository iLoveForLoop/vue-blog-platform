import express from 'express'
import { testEndPoint } from '../controllers/testController.js'

const router = express.Router()

router.get('/', testEndPoint)

export default router
