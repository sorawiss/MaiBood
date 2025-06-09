import multer from 'multer'

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

// ===== Disk Storage Configuration (Currently Active) =====
// Configure storage to save files on server disk
const storage = multer.diskStorage({
    // Set destination folder for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    // Generate unique filename for each upload
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
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