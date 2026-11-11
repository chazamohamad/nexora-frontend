import type { StoredAuthData } from "../models/auth.model";

// Storage Keys
const STORAGE_KEYS = {
  USER: "nexora_user",
  EMAIL: "nexora_email",
  SESSION: "nexora_session",
};

// Save Authentication Data
export function saveAuthData(data: StoredAuthData): void {
  sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

  sessionStorage.setItem(STORAGE_KEYS.EMAIL, data.email);

  sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(data.session));
}

// Get Authentication Data
export function getAuthData(): StoredAuthData | null {
  const user = sessionStorage.getItem(STORAGE_KEYS.USER);
  const email = sessionStorage.getItem(STORAGE_KEYS.EMAIL);
  const session = sessionStorage.getItem(STORAGE_KEYS.SESSION);

  if (!user || !email || !session) {
    return null;
  }

  try {
    return {
      user: JSON.parse(user),
      email,
      session: JSON.parse(session),
    };
  } catch {
    clearAuthData();
    return null;
  }
}

// Get Access Token
export function getAccessToken(): string | null {
  const authData = getAuthData();

  return authData?.session.accessToken ?? null;
}

// Clear Authentication Data
export function clearAuthData(): void {
  sessionStorage.removeItem(STORAGE_KEYS.USER);
  sessionStorage.removeItem(STORAGE_KEYS.EMAIL);
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
}
