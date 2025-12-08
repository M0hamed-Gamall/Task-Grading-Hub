import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import AppError from "../utils/appError.js";
import submissionService from "../services/submission.service.js" 

interface User {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

const submitTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const authenticatedReq = req as AuthenticatedRequest;
  if (!req.file) {
    throw new AppError("No file uploaded", 400, "Bad Request");
  }
  const taskId = req.params.taskId as string
  const studentId = authenticatedReq.user.id
  const filename = req.file.originalname
  const url = req.file.path
  const mimeType = req.file.mimetype
  const size = req.file.size

  const fileData = await submissionService.submitTask(taskId , studentId, filename, url, mimeType, size)
  res.status(201).json({
    message: "File uploaded successfully",
    data: fileData
  });
})

export default {submitTask}