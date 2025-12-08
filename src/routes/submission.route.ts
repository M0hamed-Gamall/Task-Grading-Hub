import { Router } from "express";
import { authRoles } from "../middleware/authRoles.js";
import { createUploader } from "../middleware/createUploader.js"
import submissionController from "../controllers/submissin.controller.js"

const route = Router()


route.post('/:taskId', authRoles("student"), createUploader({
  allowedTypes: ["application/pdf"],
  maxSizeMB: 10,
  field: "file",
}),
 submissionController.submitTask)



export default route;