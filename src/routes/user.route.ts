import { Router } from "express";
import { authRoles } from "../middleware/authRoles.js";
import userController from "../controllers/user.controller.js"

const router = Router();

router.get('/me', authRoles("student", "admin"), userController.getUser)

export default router;