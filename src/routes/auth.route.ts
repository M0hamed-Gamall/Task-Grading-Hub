import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerValidator } from '../validators/registerValidator.js';
import { loginValidator } from '../validators/loginValidator.js';

const router = Router();


router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);

export default router;
