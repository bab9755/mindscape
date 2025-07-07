"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');
class AuthService {
    async signup(data) {
        const { email, password, name } = data;
        // Check if user already exists
        const existingUser = await (0, database_1.query)('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new Error('User already exists with this email');
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, BCRYPT_ROUNDS);
        // Create user
        const userResult = await (0, database_1.query)('INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at', [email, passwordHash, name]);
        const user = userResult.rows[0];
        // Create user profile
        await (0, database_1.query)('INSERT INTO user_profiles (user_id, name) VALUES ($1, $2)', [user.id, name || '']);
        // Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)({ userId: user.id, email: user.email });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: user.id, email: user.email });
        // Store refresh token
        await this.storeRefreshToken(user.id, refreshToken);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            accessToken,
            refreshToken,
        };
    }
    async login(data) {
        const { email, password } = data;
        // Find user
        const userResult = await (0, database_1.query)('SELECT id, email, password_hash, name FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            throw new Error('Invalid email or password');
        }
        const user = userResult.rows[0];
        // Verify password
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }
        // Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)({ userId: user.id, email: user.email });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: user.id, email: user.email });
        // Store refresh token
        await this.storeRefreshToken(user.id, refreshToken);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            accessToken,
            refreshToken,
        };
    }
    async refreshAccessToken(refreshToken) {
        try {
            // Verify refresh token
            const decoded = (0, jwt_1.verifyToken)(refreshToken);
            // Check if refresh token exists in database
            const tokenResult = await (0, database_1.query)('SELECT id FROM refresh_tokens WHERE user_id = $1 AND token_hash = $2 AND expires_at > NOW()', [decoded.userId, await bcryptjs_1.default.hash(refreshToken, 1)]);
            if (tokenResult.rows.length === 0) {
                throw new Error('Invalid refresh token');
            }
            // Generate new tokens
            const newAccessToken = (0, jwt_1.generateAccessToken)({ userId: decoded.userId, email: decoded.email });
            const newRefreshToken = (0, jwt_1.generateRefreshToken)({ userId: decoded.userId, email: decoded.email });
            // Store new refresh token and remove old one
            await this.storeRefreshToken(decoded.userId, newRefreshToken);
            await this.revokeRefreshToken(refreshToken);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    async logout(refreshToken) {
        await this.revokeRefreshToken(refreshToken);
    }
    async getUserProfile(userId) {
        const result = await (0, database_1.query)(`SELECT u.id, u.email, u.name, u.created_at, up.avatar_url, up.preferences 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       WHERE u.id = $1`, [userId]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    }
    async storeRefreshToken(userId, refreshToken) {
        const tokenHash = await bcryptjs_1.default.hash(refreshToken, 1);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await (0, database_1.query)('INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)', [userId, tokenHash, expiresAt]);
    }
    async revokeRefreshToken(refreshToken) {
        const tokenHash = await bcryptjs_1.default.hash(refreshToken, 1);
        await (0, database_1.query)('DELETE FROM refresh_tokens WHERE token_hash = $1', [tokenHash]);
    }
    async cleanupExpiredTokens() {
        await (0, database_1.query)('DELETE FROM refresh_tokens WHERE expires_at < NOW()');
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map