import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerValidator } from '../validators/registerValidator.js';

const router = Router();


router.post('/register', registerValidator, validate, authController.register);

export default router;
