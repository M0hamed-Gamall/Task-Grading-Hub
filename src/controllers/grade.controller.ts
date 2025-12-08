import type { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middleware/asyncwrapper.js";
import gradeService from "../services/grade.service.js";

interface UserRequest extends Request {
  user?: {
    id: string;
    role: string
  };
}

const grade = asyncWrapper(async(req: Request, res: Response, next: NextFunction) => {
  const {degree, feedback} = req.body;
  const gradedSubmission = await gradeService.grade(req.params.submissionId as string, degree, feedback)
  res.status(200).json(gradedSubmission);
})

const getGrades = asyncWrapper(async(req: Request, res: Response, next: NextFunction) => {
  const tasksGrades = await gradeService.tasksGrades(req.params.taskId as string)
  res.status(200).json({tasksGrades})
})

const getStudentGrade = asyncWrapper(async(req: UserRequest, res: Response, next: NextFunction) => {
  const taskGrade = await gradeService.taskGrade(req.params.taskId as string, req.user?.id as string)
  res.status(200).json(taskGrade)
})

export default {grade, getGrades, getStudentGrade}