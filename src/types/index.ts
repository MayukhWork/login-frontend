export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  error?: string;
}