'use client';

import { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { login, register } from '../services/api';
import { AuthResponse } from '../types';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    login: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (isLogin) {
      if (!credentials.login) {
        setError('Username or email is required');
        return;
      }
      if (!credentials.password) {
        setError('Password is required');
        return;
      }
    } else {
      if (!credentials.username) {
        setError('Username is required');
        return;
      }
      if (credentials.username.length < 3) {
        setError('Username must be at least 3 characters long');
        return;
      }
      if (!/^[a-zA-Z0-9]+$/.test(credentials.username)) {
        setError('Username can only contain letters and numbers');
        return;
      }
      if (!credentials.email) {
        setError('Email is required');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(credentials.email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!credentials.password) {
        setError('Password is required');
        return;
      }
      if (credentials.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
    }

    try {
      let response: AuthResponse;
      if (isLogin) {
        response = await login({ login: credentials.login, password: credentials.password });
      } else {
        response = await register({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });
      }
      if (response.token) {
        setSuccess(response.message || (isLogin ? 'Login successful' : 'Registration successful'));
        localStorage.setItem('token', response.token);
        // Optionally redirect: window.location.href = '/dashboard';
      } else {
        setError(response.error || response.message || 'Operation failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            label="Username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            error={error}
            required
          />
        )}
        <Input
          label={isLogin ? 'Username or Email' : 'Email'}
          type={isLogin ? 'text' : 'email'}
          name={isLogin ? 'login' : 'email'}
          value={isLogin ? credentials.login : credentials.email}
          onChange={handleChange}
          error={error}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          error={error}
          required
        />
        {error && <p className="mt-2 text-center text-red-600">{error}</p>}
        {success && <p className="mt-2 text-center text-green-600">{success}</p>}
        <Button type="submit" variant="primary" className="w-full mt-4">
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}