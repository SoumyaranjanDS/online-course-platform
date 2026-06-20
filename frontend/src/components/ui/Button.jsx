import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  to,
  href,
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-label-md transition-all rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  const variants = {
    primary:
      "bg-primary text-on-primary hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",
    secondary:
      "bg-secondary-container text-on-secondary-container border border-secondary/20 hover:bg-secondary-container/80 hover:shadow-sm",
    outline:
      "border-2 border-outline-variant bg-transparent hover:bg-surface-container-lowest text-on-surface hover:border-outline",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
    danger:
      "bg-error text-on-error hover:bg-error/90 hover:shadow-md hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
