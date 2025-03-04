export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Only used in data model, not in UI state
}

// SanitizedUser removes sensitive fields like password
export type SanitizedUser = Omit<User, "password">;

export interface AuthState {
  user: SanitizedUser | null;
  isAuthenticated: boolean;
}
