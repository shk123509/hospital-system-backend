import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloude_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_security_key: process.env.CLOUDINARY_API_SECRET
})

const uplodeCloudinaryImage = async (loclapath) => {
    try {
        if (!loclapath) {
            return console.error("path is not exist");
        }
        const response = await cloudinary.uploader.upload(loclapath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localpathfile);
        return response
    } catch (error) {
        fs.unlinkSync(loclapath)
        return null;
    }
}

export { uplodeCloudinaryImage }