import { Router } from "express";
import { authRoles } from "../middleware/authRoles.js";
import { createUploader } from "../middleware/createUploader.js"
import submissionController from "../controllers/submissin.controller.js"
import { checkDeadline } from "../middleware/checkDeadline.js"
import { belongToStudent } from "../middleware/belongtoStudent.js"

const route = Router()


route.post('/:taskId', authRoles("student"),checkDeadline, createUploader({
  allowedTypes: ["application/pdf"],
  maxSizeMB: 10,
  field: "file",
}),
 submissionController.submitTask)

route.get('/:taskId', authRoles("admin"), submissionController.getTaskSubmissions)

route.get('/submission/:id', authRoles("admin", "student"), belongToStudent, submissionController.getSubmission)

export default route;