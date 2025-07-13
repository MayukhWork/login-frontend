'use client'; // For client-side rendering

import { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { login } from '../services/api';
import { AuthResponse } from '../types';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response: AuthResponse = await login(credentials);
      if (response.token) {
        // Handle successful login (e.g., store token in localStorage)
        console.log('Login successful', response.token);
      } else {
        setError(response.error || 'Unknown error');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Input
        label="Email"
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        error={error}
        required
      />
      <Input
        label="Password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        error={error}
        required
      />
      <Button type="submit" variant="primary" className="w-full">
        Login
      </Button>
      {error && <p className="mt-2 text-center text-red-600">{error}</p>}
    </form>
  );
};