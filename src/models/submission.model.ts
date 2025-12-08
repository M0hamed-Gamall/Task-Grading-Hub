import { Schema, model, Document } from "mongoose";
import { status } from "../constants/submissionStatus.js";

interface ISubmission extends Document {
  taskId: Schema.Types.ObjectId,
  studentId: Schema.Types.ObjectId,
  file: {filename: string, url: string, mimeType: string, size: number}
  submittedAt: Date,
  status: string,
  grade: number,
  feedback: string,
  gradedBy: Schema.Types.ObjectId,
  gradedAt: Date
  
}

const submissionSchema = new Schema<ISubmission>({
  taskId: {type: Schema.Types.ObjectId, ref: "Task", required: true},
  studentId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  file: {filename: String, url: String, mimeType: String, size: Number},
  submittedAt: {type: Date, default: () => Date.now()},
  status: {type: String, enum: status, default: "submitted"},
  grade: {type: Number, required: false},
  feedback: {type: String, default: null},
  gradedBy: {type: Schema.Types.ObjectId, ref: "User"},
  gradedAt: {type: Date}
})

const Submission = model("Submission", submissionSchema)

export default Submission;