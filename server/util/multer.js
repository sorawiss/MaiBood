import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ===== Memory Storage Configuration =====
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
    },
    // Set file size limit to 5MB
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload