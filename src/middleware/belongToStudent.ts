import type { Request, Response, NextFunction } from "express";
import Submission from "../models/submission.model.js";
import AppError from "../utils/appError.js";

export const belongToStudent = async (req: Request, res: Response, next: NextFunction) => {
  if(req.user?.role === "admin") return next()
  try {
    const submission = await Submission.findOne({
      _id: req.params.id,
      studentId: req.user!.id,
    });

    if (!submission) {
      return next(new AppError("submission not found", 404, "Not Found"))
    }
    next();
  } catch (error) {
    next(error);
  }
}
