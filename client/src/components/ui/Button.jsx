import React from 'react';
import classNames from 'classnames';

const Button = ({ children, variant = 'primary', onClick, className, ...props }) => {
  const base = 'px-4 py-2 rounded font-medium transition duration-200';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      className={classNames(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
