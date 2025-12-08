import multer, {MulterError} from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";
import AppError from "../utils/appError.js";
import type { Request, Response, NextFunction } from "express";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "task_grading_hub", // Cloudinary folder name
      resource_type: "raw", // Required for PDF files
      // public_id will be auto-generated if not specified
    };
  },
});

interface UploadOptions {
  allowedTypes: string[];
  maxSizeMB: number;
  field: string;
}

export function createUploader({ allowedTypes, maxSizeMB, field }: UploadOptions) {

  const upload = multer({
    storage,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
    fileFilter(req, file, cb) {
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new AppError(`Invalid file type. Allowed: ${allowedTypes.join(", ")}`, 400));
      }
      cb(null, true);
    }
  }).single(field);

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
      if (err instanceof MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(new AppError(`File too large. Max size is ${maxSizeMB}MB`, 400));
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return next(new AppError(`Use the correct field: ${field}`, 400));
        }
        return next(new AppError(err.message, 400));
      }
      if (err) return next(err);
      next();
    });
  };
}

