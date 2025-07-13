import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../types'; // Adjust path

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1/auth', // Adjust to your backend URL
});

export const login = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
  try {
    const response = await api.post('/login', credentials);
    return response.data as AuthResponse || { error: 'No data received' }; // **Change**: Add fallback
  } catch (error) {
    const axiosError = error as AxiosError<AuthResponse>;
    const errorResponse = axiosError.response?.data || { error: 'Login failed' }; // **Change**: Ensure consistent type
    return errorResponse; // **Change**: Return instead of throw to match Promise<AuthResponse>
  }
};

export default api;