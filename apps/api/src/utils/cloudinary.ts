import { v2 as cloudinary } from "cloudinary";
import { promisify } from "util";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: 'dnrqgmfm1',
    api_key: '959352575958355',
    api_secret: 'g1eWtQhTKH6Q_WliPECV130ZsxI',
})

export const cloudinaryUpload = async (file: Buffer) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'images' },
        (error: UploadApiErrorResponse | null | undefined, result?: UploadApiResponse) => {
          if (error) {
            return reject(error);
          }
          resolve({ res: result?.secure_url });
        }
      ).end(file);
    });
  };