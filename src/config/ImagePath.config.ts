import dotenv from 'dotenv';

dotenv.config()

export const generateImagePath = (image: string) => {
    return `${process.env.BACKEND_LINK}/uploads/${image}`
}