import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/auth', // Adjust to your backend URL
});

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

export default api;