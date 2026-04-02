import { InputHTMLAttributes } from "react";
import Input from "@/components/atoms/Input";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  icon?: string;
}

export default function FormField({ label, name, error, icon, className = "", ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[0.6875rem] font-semibold tracking-[0.05em] uppercase text-primary/80"
      >
        {label}
      </label>
      <Input
        id={name}
        name={name}
        icon={icon}
        error={!!error}
        className={className}
        {...props}
      />
      {error && (
        <p className="text-xs text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}
