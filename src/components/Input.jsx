import { forwardRef } from "react";

const Input = forwardRef(
  (
    { label, error, success, required = false, className = "", id, ...props },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputClasses = `
    w-full px-3 py-2 border rounded-lg bg-surface text-text-primary placeholder-text-secondary
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    transition-all duration-200
    ${
      error
        ? "border-red-500 focus:ring-red-500"
        : success
        ? "border-green-500 focus:ring-green-500"
        : "border-border hover:border-border-hover"
    }
    ${className}
  `;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input ref={ref} id={inputId} className={inputClasses} {...props} />
        {error && (
          <p className="text-sm text-red-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {success}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
