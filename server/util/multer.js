import multer from 'multer'


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


export default upload