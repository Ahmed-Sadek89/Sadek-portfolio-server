import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from './cloudinary.config';
import { convertToWebp } from './convertToWebp';

cloudinary.config(cloudinaryConfig);


export async function uploadToCloudinary(path: string) {
    const webpDataString = await convertToWebp(path);
    return await cloudinary.uploader.upload(`data:image/webp;base64,${webpDataString}`, {
        resource_type: "image",
        folder: "sadek_portfolio",
        public_id: `IMG-${Date.now()}`,
    });
}

export async function removeFromCloudinary(imgLink: string) {
    if (imgLink.length > 0) {
        // https://res.cloudinary.com/dap3fnwtc/image/upload/v1723162229/sadek_portfolio/IMG-1723165807209.webp
        const ImgFolderName = imgLink.split('/')[7]
        let imgId = imgLink.split('/')[8]
        imgId = imgId.split('.')[0] || ""
        const publicId = `${ImgFolderName}/${imgId}`
        return await cloudinary.uploader.destroy(publicId)
    }
}
