import sharp from "sharp";

export async function convertToWebp(path: string) {
    const webpData = await sharp(path).toFormat('webp').toBuffer();

    // Convert the buffer to a Base64-encoded string
    const webpDataString = webpData.toString('base64');
    return webpDataString
}