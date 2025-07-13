import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md font-medium focus:outline-none ${
      variant === 'primary'
        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
  />
);