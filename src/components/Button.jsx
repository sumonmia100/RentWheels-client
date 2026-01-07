import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      children,
      loading = false,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-primary text-white hover:opacity-90 focus:ring-primary shadow-sm",
      secondary:
        "bg-secondary text-white hover:opacity-90 focus:ring-secondary shadow-sm",
      accent:
        "bg-accent text-white hover:opacity-90 focus:ring-accent shadow-sm",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary bg-transparent",
      ghost:
        "text-primary hover:bg-primary hover:bg-opacity-10 focus:ring-primary bg-transparent",
      surface:
        "bg-surface text-text-primary border border-border hover:border-border-hover focus:ring-primary shadow-sm",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm min-h-[2rem]",
      md: "px-4 py-2 text-base min-h-[2.5rem]",
      lg: "px-6 py-3 text-lg min-h-[3rem]",
    };

    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
