import multer from 'multer';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config()
// Determine the upload destination based on the environment
const uploadPath =
    process.env.NODE_ENV === 'production'
        ? `${process.env.BACKEND_LINK}/uploads/`  // Set your production path here
        : 'uploads/';  // Local development path

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Extract the original file extension
        const extension = path.extname(file.originalname);

        // Create a custom name with the extension
        const customFileName = `IMG-${Date.now()}${extension}`;

        cb(null, customFileName);
    }
});

export const upload = multer({ storage });
