import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerValidator } from '../validators/registerValidator.js';
import { loginValidator } from '../validators/loginValidator.js';
import { authRoles } from '../middleware/authRoles.js';

const router = Router();


router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);

router.get('/protected', authRoles("admin"), (req,res,next) => {
  res.send("passed")
})
router.post('/refresh', authController.refresh)

export default router;
