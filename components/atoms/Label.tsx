import { LabelHTMLAttributes, memo, useCallback } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = memo(function Label({ children, className = "", onClick, ...props }: LabelProps) {
  const handleClick = useCallback<NonNullable<LabelProps["onClick"]>>(
    (event) => {
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <label
      className={`text-[0.6875rem] font-semibold tracking-[0.05em] uppercase text-primary/80 ${className}`.trim()}
      onClick={handleClick}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;
