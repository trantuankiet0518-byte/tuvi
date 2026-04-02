import { ReactNode, memo } from "react";

type BadgeVariant = "primary" | "secondary" | "success" | "error" | "warning" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-secondary-container text-on-secondary-container",
  secondary: "bg-surface-container-highest text-on-surface-variant",
  success: "bg-primary/10 text-primary",
  error: "bg-error-container text-on-error-container",
  warning: "bg-tertiary-container/20 text-tertiary",
  outline: "border border-outline-variant/30 text-on-surface-variant",
};

const Badge = memo(function Badge({ variant = "primary", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded
        text-[10px] font-bold uppercase tracking-wider
        ${variantStyles[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
