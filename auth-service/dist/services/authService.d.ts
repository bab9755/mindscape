import { SignupRequest, LoginRequest, AuthResponse } from '../types';
export declare class AuthService {
    signup(data: SignupRequest): Promise<AuthResponse>;
    login(data: LoginRequest): Promise<AuthResponse>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    getUserProfile(userId: string): Promise<any>;
    private storeRefreshToken;
    private revokeRefreshToken;
    cleanupExpiredTokens(): Promise<void>;
}
//# sourceMappingURL=authService.d.ts.map