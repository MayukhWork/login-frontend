import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1/auth', // Adjust to your backend URL
});

export const login = async (credentials: { login: string; password: string }): Promise<AuthResponse> => {
  try {
    const response = await api.post('/login', credentials);
    return response.data as AuthResponse || { error: 'No data received' };
  } catch (error) {
    const axiosError = error as AxiosError<AuthResponse>;
    const errorResponse = axiosError.response?.data || { error: 'Login failed' };
    return errorResponse;
  }
};

export const register = async (credentials: { username: string; email: string; password: string }): Promise<AuthResponse> => {
  try {
    const response = await api.post('/register', credentials);
    return response.data as AuthResponse || { error: 'No data received' };
  } catch (error) {
    const axiosError = error as AxiosError<AuthResponse>;
    const errorResponse = axiosError.response?.data || { error: 'Registration failed' };
    return errorResponse;
  }
};

export default api;