/**
import express from 'express'
import bodyParser from 'body-parser'
import cloudinary from 'cloudinary'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import multer from 'multer'

configDotenv()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//multer setup
const storage = multer.memoryStorage()
const upload = multer({ storage })

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    const result = await cloudinary.v2.uploader.upload(base64Data, {
      resource_type: 'image',
      folder: 'uploads/profiles',
    })

    res.status(200).json({
      message: 'Successfully Uploaded',
      url: result.secure_url,
    })
  } catch (error) {
    console.log('Error uploading image: ', error.message)
    res.status(500).json({
      error: 'Failed to upload image',
      details: error.message,
    })
  }
})

app.post('/delete-file', async (req, res) => {
  const { publicId } = req.body
  console.log('Public ID for deletion:', publicId)

  try {
    const result = await cloudinary.uploader.destroy(publicId)
    if (result.result === 'ok') {
      res.json({ success: true, message: 'Image deleted successfully', result })
    } else {
      console.log('image not found')
      res
        .status(400)
        .json({ success: false, message: 'Image not found', result })
    }
  } catch (error) {
    console.log('Error deleting the image: ', error.message)
    res.status(500).json({
      error: 'Failed to delete image',
      details: error.message,
    })
  }
})

app.get('/test', (req, res) => {
  res.status(200).send({
    test: 'start of my express journey???',
  })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Serving is running on http://localhost:${PORT}`)
})
*/

import app from './scr/app.js'

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running at the http://localhost:${PORT}`)
})
