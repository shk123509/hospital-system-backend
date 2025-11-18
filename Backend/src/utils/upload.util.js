import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uplodecloudinaryFile = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("Local file path not provided");

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "uploads"
    });

    console.log("✅ File uploaded to Cloudinary:", response.url);

    fs.unlinkSync(localFilePath); // clean temp file
    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uplodecloudinaryFile };
