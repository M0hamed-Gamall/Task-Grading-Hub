import { Router } from "express"
import { authRoles } from "../middleware/authRoles.js";
import gradeController from "../controllers/grade.controller.js";
const router = Router()

router.post('/:submissionId', authRoles("admin"), gradeController.grade)

router.get('/tasks/:taskId/me', authRoles("student"), gradeController.getStudentGrade)

router.get('/tasks/:taskId', authRoles("admin"), gradeController.getGrades)


export default router;