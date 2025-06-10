// Get the base URL from environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

/**
 * Formats an image URL to use the server's URL or return S3 URL as is
 * @param {string} imagePath - The image path from the server or S3 URL
 * @returns {string} The complete URL to the image
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If the image path is already a full URL (S3 or other), return it as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // If the image path starts with /uploads, it's a legacy local path
    if (imagePath.startsWith('/uploads')) {
        return `${baseURL}${imagePath}`;
    }
    
    // For any other case, assume it's a relative path and prepend the base URL
    return `${baseURL}/uploads/${imagePath}`;
}; 