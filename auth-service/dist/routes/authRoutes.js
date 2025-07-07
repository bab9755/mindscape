"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Health check
router.get('/health', authController_1.healthCheck);
// Public routes
router.post('/signup', authController_1.signupValidation, authController_1.signup);
router.post('/login', authController_1.loginValidation, authController_1.login);
router.post('/refresh', authController_1.refreshToken);
router.post('/logout', authController_1.logout);
// Protected routes
router.get('/profile', auth_1.authenticateToken, authController_1.getProfile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map