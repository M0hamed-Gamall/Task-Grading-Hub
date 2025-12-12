import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerValidator } from '../validators/registerValidator.js';
import { loginValidator } from '../validators/loginValidator.js';
import passport from 'passport';

const router = Router();


router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {session: false}) ,authController.googleAuthCallback);

router.post('/refresh', authController.refresh)

export default router;
