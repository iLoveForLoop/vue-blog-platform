import express, { Router } from 'express'
import {
  uploadFile,
  deleteFile,
} from '../controllers/profilePictureController.js'
import upload from '../middlewares/multerSetup.js'

const router = express.Router()

router.post('/upload', upload.single('file'), uploadFile)
router.post('/delete-file', deleteFile)

export default router
