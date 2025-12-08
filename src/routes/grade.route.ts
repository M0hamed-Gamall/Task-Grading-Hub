import { Router } from "express"
import { authRoles } from "../middleware/authRoles.js";
import gradeController from "../controllers/grade.controller.js";
const router = Router()

router.post('/:submissionId', authRoles("admin"), gradeController.grade)

export default router;