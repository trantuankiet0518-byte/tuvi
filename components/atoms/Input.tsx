import { InputHTMLAttributes, forwardRef } from "react";
import Icon from "./Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  error?: boolean;
}

const InputBase = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {icon ? (
          <Icon
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg pointer-events-none"
            name={icon}
          />
        ) : null}
        <input
          ref={ref}
          className={`
            w-full bg-surface-container-lowest
            border ${error ? "border-error/50 focus:ring-error/40" : "border-transparent focus:ring-primary/40"}
            focus:ring-1 focus:outline-none
            text-on-surface placeholder:text-on-surface-variant/30
            rounded-lg py-3 transition-all
            ${icon ? "pl-11 pr-4" : "px-4"}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

InputBase.displayName = "Input";

export default InputBase;
