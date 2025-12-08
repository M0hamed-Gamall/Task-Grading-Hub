import Submission from "../models/submission.model.js";
import AppError from "../utils/appError.js";
import { status } from "../constants/submissionStatus.js";

const grade = async(submissionId: string, degree: number, feedback: string) => {
  let submission = await Submission.findById(submissionId)
  if(!submission) throw new AppError("Submission not exist", 404, "Not Found")
  submission.grade = degree;
  submission.feedback = feedback;
  submission.status = status.graded
  submission.save();
  return submission;
}

const tasksGrades = async(taskId: string) => {
  const grades = await Submission.find({taskId, status: status.graded})
  return grades;
}

export default {grade, tasksGrades}