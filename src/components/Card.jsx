import { forwardRef } from "react";

const Card = forwardRef(
  (
    { children, className = "", hover = false, padding = "md", ...props },
    ref
  ) => {
    const baseClasses =
      "bg-surface rounded-xl border border-border shadow-sm transition-all duration-200";
    const hoverClasses = hover
      ? "hover:shadow-md hover:border-border-hover cursor-pointer"
      : "";

    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const paddingClass = paddingClasses[padding] || paddingClasses.md;

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${hoverClasses} ${paddingClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
