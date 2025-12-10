import { Router } from "express";
import { authRoles } from "../middleware/authRoles.js";
import { createUploader } from "../middleware/createUploader.js"
import submissionController from "../controllers/submissin.controller.js"
import { checkDeadline } from "../middleware/checkDeadline.js"
import { belongToStudent } from "../middleware/belongToStudent.js"

const route = Router()

route.get('/submission/:id', authRoles("admin", "student"), belongToStudent, submissionController.getSubmission)

route.get('/me', authRoles("student"), submissionController.getStudentSubmissions)

route.post('/:taskId', authRoles("student"),checkDeadline, createUploader({
  allowedTypes: ["application/pdf"],
  maxSizeMB: 10,
  field: "file",
}),
 submissionController.submitTask)

 route.get('/:taskId', authRoles("admin"), submissionController.getTaskSubmissions)

export default route;