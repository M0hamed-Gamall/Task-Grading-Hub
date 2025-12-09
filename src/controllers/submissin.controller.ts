import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import AppError from "../utils/appError.js";
import submissionService from "../services/submission.service.js" 

const submitTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400, "Bad Request");
  }
  const taskId = req.params.taskId as string
  const studentId = req.user!.id
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

const getTaskSubmissions = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const submissions = await submissionService.getTaskSubmissions(req.params.taskId as string)
  res.status(200).json({submissions})
})

const getSubmission = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const submission = await submissionService.getSubmission(req.params.id as string)
  res.status(200).json(submission)
})

const getStudentSubmissions = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const submissions = await submissionService.getStudentSubmissions(req.user!.id)
  res.status(200).json({submissions})
})

export default {submitTask, getTaskSubmissions, getSubmission, getStudentSubmissions}