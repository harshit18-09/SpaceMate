import React from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  outline:
    "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
  ghost:
    "text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
  success:
    "bg-green-600 text-white hover:bg-green-500 focus:ring-green-400",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {leftIcon && !loading ? <span className="shrink-0">{leftIcon}</span> : null}
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
      {rightIcon && !loading ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
}
