import AppError from "../utils/appError.js";
import Submission from "../models/submission.model.js";

const submitTask = async (taskId: string , studentId: string, filename: string, url: string, mimeType: string, size: number) => {
  if (!url) {
    throw new AppError("Failed to retrieve file URL from cloud storage", 500, "Internal Server Error");
  }
  const fileData = await Submission.create({
    taskId,
    studentId,
    file: {
      filename,
      url,
      mimeType,
      size,
    }
  });
  return fileData
} 

const getTaskSubmissions = async(taskId: string) => {
  const submissions = await Submission.find({taskId})
  return submissions;
}


export default {submitTask, getTaskSubmissions}