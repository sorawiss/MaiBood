import express from 'express';
import upload from '../util/multer.js'; 
import { uploadFile } from '../util/s3.js'; 

const router = express.Router();

router.post('/image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided or file type is invalid.' });
    }

    console.log('File received:', req.file.originalname, req.file.mimetype, req.file.size);

    try {
        const uniqueFilename = `uploads/${Date.now()}-${req.file.originalname}`; 

        // เรียกอัปโหลดไปที่ S3
        const s3Response = await uploadFile(req.file.buffer, uniqueFilename);

        const imageUrl = s3Response; 

        console.log(`Uploaded to S3 successfully: ${imageUrl}`);


        res.status(200).json({
            message: 'Image uploaded successfully!',
            imageUrl: imageUrl
        });

    } catch (error) {
        console.error('Error during upload process:', error);
        res.status(500).json({ message: 'Server error during image upload.', error: error.message });
    }
});

export default router;
