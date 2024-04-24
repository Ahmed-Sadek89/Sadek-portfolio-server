import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from './cloudinary.config';
import sharp from 'sharp';

cloudinary.config(cloudinaryConfig);


async function convertToWebp(path: string) {
    const webpData = await sharp(path).toFormat('webp').toBuffer();

    // Convert the buffer to a Base64-encoded string
    const webpDataString = webpData.toString('base64');
    return webpDataString
}

async function uploadToCloudinary(path: string) {
    const webpDataString = await convertToWebp(path);
    return await cloudinary.uploader.upload(`data:image/webp;base64,${webpDataString}`, {
        resource_type: "image",
        folder: "sadek_portfolio"
    });
}

export default uploadToCloudinary