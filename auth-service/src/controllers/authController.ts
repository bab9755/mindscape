import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
import { AuthRequest, SignupRequest, LoginRequest } from '../types';

const authService = new AuthService();

export const signupValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('name').optional().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const signupData: SignupRequest = req.body;
    const result = await authService.signup(signupData);

    res.status(201).json({
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof Error && error.message === 'User already exists with this email') {
      return res.status(409).json({
        error: 'User already exists with this email',
        code: 'USER_EXISTS',
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      code: 'SIGNUP_FAILED',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const loginData: LoginRequest = req.body;
    const result = await authService.login(loginData);

    res.json({
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof Error && error.message === 'Invalid email or password') {
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS',
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      code: 'LOGIN_FAILED',
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Refresh token is required',
        code: 'REFRESH_TOKEN_MISSING',
      });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    res.json({
      message: 'Token refreshed successfully',
      data: result,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    
    res.status(401).json({
      error: 'Invalid refresh token',
      code: 'INVALID_REFRESH_TOKEN',
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Refresh token is required',
        code: 'REFRESH_TOKEN_MISSING',
      });
    }

    await authService.logout(refreshToken);

    res.json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      code: 'LOGOUT_FAILED',
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'AUTH_REQUIRED',
      });
    }

    const profile = await authService.getUserProfile(req.user.userId);

    res.json({
      message: 'Profile retrieved successfully',
      data: profile,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    
    if (error instanceof Error && error.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      code: 'PROFILE_FETCH_FAILED',
    });
  }
};

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
  });
};
