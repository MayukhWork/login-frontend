export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  user?: { username: string; email: string };
  token?: string;
  error?: string;
}