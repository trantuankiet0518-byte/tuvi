import { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "./Icon";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: string;
  iconPosition?: "left" | "right";
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-button-gradient text-on-primary font-bold hover:brightness-110 shadow-lg shadow-primary-container/10",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-bright",
  ghost:
    "bg-transparent text-primary hover:bg-surface-container-high",
  danger:
    "bg-error-container text-on-error-container hover:brightness-110",
};

export default function Button({
  variant = "primary",
  icon,
  iconPosition = "right",
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-3 rounded-lg text-sm font-semibold
        active:scale-[0.98] transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]} ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === "left" ? (
        <Icon className="text-[1.1rem]" name={icon} />
      ) : null}
      {children}
      {icon && iconPosition === "right" ? (
        <Icon className="text-[1.1rem]" name={icon} />
      ) : null}
    </button>
  );
}
