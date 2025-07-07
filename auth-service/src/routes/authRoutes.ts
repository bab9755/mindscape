import { Router } from 'express';
import {
  signup,
  login,
  refreshToken,
  logout,
  getProfile,
  healthCheck,
  signupValidation,
  loginValidation,
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Health check
router.get('/health', healthCheck);

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router;
