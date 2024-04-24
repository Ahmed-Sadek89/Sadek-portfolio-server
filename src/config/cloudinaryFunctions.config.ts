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

export async function uploadToCloudinary(path: string) {
    const webpDataString = await convertToWebp(path);
    return await cloudinary.uploader.upload(`data:image/webp;base64,${webpDataString}`, {
        resource_type: "image",
        folder: "sadek_portfolio"
    });
}

export async function removeFromCloudinary(imgLink: string) {
    const ImgFolderName = imgLink.split('/')[7]
    let imgId = imgLink.split('/')[8]
    imgId = imgId.split('.')[0]
    const publicId = `${ImgFolderName}/${imgId}`
    return await cloudinary.uploader.destroy(publicId)
}
