import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Extract the original file extension
        const extension = path.extname(file.originalname);

        // Create a custom name with the extension
        const customFileName = `IMG-${Date.now()}${extension}`;

        cb(null, customFileName);
    }
});

export const upload = multer({ storage })