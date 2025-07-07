import { JWTPayload } from '../types';
export declare const generateAccessToken: (payload: Omit<JWTPayload, "iat" | "exp">) => string;
export declare const generateRefreshToken: (payload: Omit<JWTPayload, "iat" | "exp">) => string;
export declare const verifyToken: (token: string) => JWTPayload;
export declare const decodeToken: (token: string) => JWTPayload | null;
export declare const isTokenExpired: (token: string) => boolean;
//# sourceMappingURL=jwt.d.ts.map