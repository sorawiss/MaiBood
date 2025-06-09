import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create absolute path to public/uploads directory
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads')

// ===== Memory Storage Configuration (Currently Commented Out) =====
/*
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Basic image type check (optional but recommended)
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'), false); // Reject the file
        }
    }
});
*/

// ===== Disk Storage Configuration =====
const storage = multer.diskStorage({
    // Set destination folder for uploaded files using absolute path
    destination: (req, file, cb) => {
        cb(null, uploadsDir)
    },
    // Generate unique filename for each upload
    filename: (req, file, cb) => {
        // Get file extension
        const ext = path.extname(file.originalname)
        // Create unique filename with timestamp and original extension
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`
        cb(null, uniqueName)
    }
})

// Create multer middleware with disk storage
const upload = multer({
    storage: storage,
    // Validate file types
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed!'), false)
        }
    },
    // Set file size limit to 5MB
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export default upload