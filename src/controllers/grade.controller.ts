import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import gradeService from "../services/grade.service.js";

const grade = asyncWrapper(async(req: Request, res: Response, next: NextFunction) => {
  const {degree, feedback} = req.body;
  const gradedSubmission = await gradeService.grade(req.params.submissionId as string, degree, feedback)
  res.status(201).json(gradedSubmission);
})

export default {grade}