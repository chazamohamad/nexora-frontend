/* ================================
   LOGIN CREDENTIALS
================================ */

export interface LoginCredentials {
  email: string;
  password: string;
}

/* ================================
   AUTH USER
================================ */

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;

  user_metadata: Record<string, unknown>;
  app_metadata: Record<string, unknown>;

  created_at: string;
  updated_at?: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
}

/* ================================
   AUTH SESSION
================================ */

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt?: number;
}

/* ================================
   LOGIN RESPONSE
================================ */

export interface LoginResponse {
  success: boolean;
  message: string;

  data: {
    user: AuthUser;
    session: AuthSession;
  };
}

/* ================================
   STORED AUTH DATA
================================ */

export interface StoredAuthData {
  user: AuthUser;
  email: string;
  session: AuthSession;
}
