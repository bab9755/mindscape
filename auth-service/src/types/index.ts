import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
  is_verified: boolean;
}

export interface UserProfile {
  user_id: string;
  name: string;
  avatar_url?: string;
  preferences: Record<string, any>;
}

export interface RefreshToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  accessToken: string;
  refreshToken: string;
}
