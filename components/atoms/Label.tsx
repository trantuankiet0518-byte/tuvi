import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`text-[0.6875rem] font-semibold tracking-[0.05em] uppercase text-primary/80 ${className}`.trim()}
      {...props}
    >
      {children}
    </label>
  );
}
