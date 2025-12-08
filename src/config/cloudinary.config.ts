import { v2 as cloudinary } from "cloudinary";

/**
 *          This the reason wahy i use dotenv again here
 * 
 * Imports are processed before code execution
  When cloudinary.config.ts is imported, its code runs immediately
  If it doesn't load dotenv itself, process.env isn't available yet
  Keep dotenv.config() in cloudinary.config.ts to ensure env vars are loaded before the module code runs
 */
import dotenv from "dotenv";
dotenv.config({
  path: "./src/config/.env",
});

// Validate and configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME ;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  const missing = [];
  if (!cloudName) missing.push("CLOUDINARY_CLOUD_NAME or CLOUDINARY_NAME");
  if (!apiKey) missing.push("CLOUDINARY_API_KEY");
  if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");
  
  throw new Error(
    `Cloudinary configuration error: Missing required environment variables: ${missing.join(", ")}. ` +
    `Please check your .env file in src/config/.env`
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary