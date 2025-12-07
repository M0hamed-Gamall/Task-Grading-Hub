import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import { authRoles } from "../middleware/authRoles.js";
import { taskValidator } from "../validators/createTask.validator.js";
import { validate } from "../middleware/validate.js"

const router = Router()

router.post('/', authRoles("admin"),taskValidator, validate, taskController.addTask)
router.get('/', authRoles("student", "admin"), taskController.getTasks)
router.get('/:id', authRoles("student", "admin"), taskController.getTask)

export default router