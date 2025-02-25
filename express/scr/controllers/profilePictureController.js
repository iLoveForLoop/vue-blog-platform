import cloudinary from '../config/cloudinary.js'

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file')
      req.status(400).json({
        error: 'no file uploaded',
      })
    }

    const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    const result = await cloudinary.v2.uploader.upload(base64Data, {
      resource_type: 'image',
      folder: 'uploads/profiles',
    })

    res.status(200).json({
      message: 'uploaded successfully',
      url: result.secure_url,
    })
  } catch (error) {
    console.log('Error uploading image: ', error.message)
    res.status(500).json({
      error: 'failed to upload',
      details: error.message,
    })
  }
}

export const deleteFile = async (req, res) => {
  const { publicId } = req.body

  try {
    const result = await cloudinary.uploader.destroy(publicId)
    if (result.result == '200') {
      res.json({
        success: true,
        message: 'Image deleted successfully',
        result,
      })
    } else {
      res.json({
        success: false,
        message: 'Image not found',
        result,
      })
    }
  } catch (error) {
    console.log('Failed to delete: ', error.message)
    res.status(500).json({
      message: 'Failed to delete image',
      details: error.message,
    })
  }
}
