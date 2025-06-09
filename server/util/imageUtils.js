import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create absolute path to public/uploads directory
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

export async function deleteOldImage(imageUrl) {
    if (!imageUrl) return;
    
    try {
        // Extract filename from URL
        const filename = path.basename(imageUrl);
        const filepath = path.join(uploadsDir, filename);
        
        // Check if file exists before deleting
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(`Deleted old image: ${filename}`);
        } else {
            console.log(`File not found: ${filepath}`);
        }
    } catch (error) {
        console.error('Error deleting old image:', error);
    }
} 