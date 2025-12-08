import type { Request, Response, NextFunction } from "express";
import Task from "../models/task.model.js";
import AppError from "../utils/appError.js";

export const checkDeadline = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return next(new AppError("Task not found", 404, "Not Found"));
    }

    
    const currentTime = new Date();
    const deadline = new Date(task.deadline);

    if (currentTime > deadline) {
      return next(
        new AppError(
          `Submission deadline has passed. The deadline was ${deadline.toLocaleString()}`,
          403,
          "Forbidden"
        )
      );
    }

    next();
  } catch (error) {
    return next(new AppError("Error checking task deadline", 500, "Internal Server Error"));
  }
};